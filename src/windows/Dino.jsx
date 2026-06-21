import { useEffect, useRef, useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/windowWrapper";

const DinoGame = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  // Game states
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("dino_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isGameOver, setIsGameOver] = useState(false);
  
  // Game engine variables (kept in refs to avoid React re-renders interrupting the loop)
  const gameStateRef = useRef({
    score: 0,
    speed: 4.5,
    obstacles: [],
    groundOffset: 0,
    gameActive: false,
    gameOver: false,
    
    // Dino physics
    dino: {
      x: 60,
      y: 145, // bottom ground is 175, height is 30 -> y is 145
      width: 22,
      height: 30,
      vy: 0,
      gravity: 0.65,
      jumpForce: -10.5,
      isJumping: false,
      runFrame: 0,
    }
  });

  const triggerJump = () => {
    const state = gameStateRef.current;
    if (state.gameOver) {
      restartGame();
      return;
    }
    
    if (!state.gameActive) {
      state.gameActive = true;
      setIsPlaying(true);
      return;
    }
    
    if (!state.dino.isJumping) {
      state.dino.vy = state.dino.jumpForce;
      state.dino.isJumping = true;
    }
  };

  const restartGame = () => {
    gameStateRef.current = {
      score: 0,
      speed: 4.5,
      obstacles: [],
      groundOffset: 0,
      gameActive: true,
      gameOver: false,
      dino: {
        x: 60,
        y: 145,
        width: 22,
        height: 30,
        vy: 0,
        gravity: 0.65,
        jumpForce: -10.5,
        isJumping: false,
        runFrame: 0,
      }
    };
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  // Input listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        triggerJump();
      } else if (e.code === "Enter" && gameStateRef.current.gameOver) {
        e.preventDefault();
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;
    let obstacleTimer = 0;

    const gameLoop = () => {
      const state = gameStateRef.current;
      
      // Update Physics & Spawn obstacles if active
      if (state.gameActive && !state.gameOver) {
        // Dino Physics
        state.dino.y += state.dino.vy;
        state.dino.vy += state.dino.gravity;
        
        // Ground collision
        if (state.dino.y >= 145) {
          state.dino.y = 145;
          state.dino.vy = 0;
          state.dino.isJumping = false;
        }

        // Running animation legs toggle
        state.dino.runFrame += 0.15;

        // Ground parallax movement
        state.groundOffset += state.speed;
        if (state.groundOffset >= 40) {
          state.groundOffset = 0;
        }

        // Difficulty scaling (slowly increase speed)
        state.speed = 4.5 + (state.score / 150);

        // Score increment
        state.score += 0.2;
        const currentScore = Math.floor(state.score);
        setScore(currentScore);

        // Obstacles (Cacti) management
        obstacleTimer--;
        if (obstacleTimer <= 0) {
          // Spawn new obstacle
          const width = 12 + Math.random() * 8;
          const height = 24 + Math.random() * 16;
          state.obstacles.push({
            x: canvas.width,
            y: 175 - height,
            width,
            height,
          });
          // Spawning cooldown based on speed
          obstacleTimer = Math.max(50, 90 - Math.floor(state.speed * 4) + Math.random() * 50);
        }

        // Update obstacles positions
        state.obstacles.forEach((obs) => {
          obs.x -= state.speed;
        });

        // Filter offscreen obstacles
        state.obstacles = state.obstacles.filter((obs) => obs.x + obs.width > 0);

        // Collision Check (AABB)
        for (let i = 0; i < state.obstacles.length; i++) {
          const obs = state.obstacles[i];
          const dino = state.dino;
          
          // Shrink bounding box slightly for fair collisions
          const dBox = { x: dino.x + 3, y: dino.y + 2, w: dino.width - 6, h: dino.height - 4 };
          const oBox = { x: obs.x + 2, y: obs.y + 2, w: obs.width - 4, h: obs.height - 4 };

          if (
            dBox.x < oBox.x + oBox.w &&
            dBox.x + dBox.w > oBox.x &&
            dBox.y < oBox.y + oBox.h &&
            dBox.y + dBox.h > oBox.y
          ) {
            // Collision detected! Game Over
            state.gameOver = true;
            setIsGameOver(true);
            setIsPlaying(false);
            
            // Sync High Score
            setHighScore((prev) => {
              const currentIntScore = Math.floor(state.score);
              if (currentIntScore > prev) {
                localStorage.setItem("dino_highscore", currentIntScore.toString());
                return currentIntScore;
              }
              return prev;
            });
            break;
          }
        }
      }

      // --- RENDERING RETROWAVE DRAWINGS ---
      // Clear with dark charcoal background
      ctx.fillStyle = "#0c0d12";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Ground Line (Neon Cyan Glow)
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#00d8ff";
      ctx.strokeStyle = "#00d8ff";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, 175);
      ctx.lineTo(canvas.width, 175);
      ctx.stroke();

      // 2. Draw Moving Ground Grid Verticals
      ctx.shadowBlur = 4;
      ctx.strokeStyle = "#0072ff";
      ctx.lineWidth = 1;
      const verticalLineSpacing = 30;
      const verticalLinesStart = -(state.groundOffset);
      for (let x = verticalLinesStart; x < canvas.width + 40; x += verticalLineSpacing) {
        ctx.beginPath();
        // Perspective slant ground grid effect
        ctx.moveTo(x, 175);
        ctx.lineTo(x - 20, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines in perspective grid
      ctx.beginPath();
      ctx.moveTo(0, 185);
      ctx.lineTo(canvas.width, 185);
      ctx.moveTo(0, 195);
      ctx.lineTo(canvas.width, 195);
      ctx.stroke();

      // 3. Draw Dinosaur (Neon Neon Green Wireframe)
      const dino = state.dino;
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#39ff14";
      ctx.strokeStyle = "#39ff14";
      ctx.lineWidth = 2.5;

      // Draw Dino head / neck / snout
      ctx.beginPath();
      ctx.strokeRect(dino.x + 8, dino.y, 14, 11); // Snout box
      ctx.clearRect(dino.x + 9, dino.y + 1, 12, 9); // Transparent fill
      
      // Dino eye
      ctx.fillStyle = "#39ff14";
      ctx.fillRect(dino.x + 12, dino.y + 3, 2.5, 2.5);

      // Snout details
      ctx.fillStyle = "#0c0d12";
      ctx.fillRect(dino.x + 19, dino.y + 7, 3, 2); // Snout notch

      // Dino Body
      ctx.strokeRect(dino.x, dino.y + 10, 16, 12);
      ctx.clearRect(dino.x + 1, dino.y + 11, 14, 10);
      
      // Neck connection
      ctx.beginPath();
      ctx.moveTo(dino.x + 6, dino.y + 10);
      ctx.lineTo(dino.x + 10, dino.y + 10);
      ctx.stroke();

      // Running Legs Animation
      const legOffset = Math.floor(dino.runFrame) % 2 === 0;
      ctx.lineWidth = 2.5;
      if (dino.isJumping) {
        // Jumping legs (retracted)
        ctx.beginPath();
        ctx.moveTo(dino.x + 4, dino.y + 22);
        ctx.lineTo(dino.x + 4, dino.y + 26);
        ctx.moveTo(dino.x + 12, dino.y + 22);
        ctx.lineTo(dino.x + 12, dino.y + 26);
        ctx.stroke();
      } else {
        // Running legs
        ctx.beginPath();
        if (legOffset) {
          // Leg 1 down, Leg 2 back
          ctx.moveTo(dino.x + 4, dino.y + 22);
          ctx.lineTo(dino.x + 4, dino.y + 30);
          ctx.moveTo(dino.x + 11, dino.y + 22);
          ctx.lineTo(dino.x + 15, dino.y + 26);
        } else {
          // Leg 1 back, Leg 2 down
          ctx.moveTo(dino.x + 4, dino.y + 22);
          ctx.lineTo(dino.x, dino.y + 26);
          ctx.moveTo(dino.x + 11, dino.y + 22);
          ctx.lineTo(dino.x + 11, dino.y + 30);
        }
        ctx.stroke();
      }

      // Small T-rex arm
      ctx.beginPath();
      ctx.moveTo(dino.x + 14, dino.y + 13);
      ctx.lineTo(dino.x + 18, dino.y + 13);
      ctx.stroke();

      // Tail
      ctx.beginPath();
      ctx.moveTo(dino.x, dino.y + 13);
      ctx.lineTo(dino.x - 7, dino.y + 18);
      ctx.lineTo(dino.x, dino.y + 21);
      ctx.stroke();

      // 4. Draw Obstacles (Neon Hot Pink Cacti)
      state.obstacles.forEach((obs) => {
        ctx.shadowBlur = 14;
        ctx.shadowColor = "#ff007f";
        ctx.strokeStyle = "#ff007f";
        ctx.lineWidth = 2.5;

        // Draw central trunk
        ctx.strokeRect(obs.x + obs.width / 2 - 2.5, obs.y, 5, obs.height);
        ctx.clearRect(obs.x + obs.width / 2 - 1.5, obs.y + 1, 3, obs.height - 2);

        // Draw left arm branch
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.width / 2 - 2.5, obs.y + obs.height * 0.4);
        ctx.lineTo(obs.x, obs.y + obs.height * 0.4);
        ctx.lineTo(obs.x, obs.y + obs.height * 0.15);
        ctx.stroke();

        // Draw right arm branch
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.width / 2 + 2.5, obs.y + obs.height * 0.5);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height * 0.5);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height * 0.25);
        ctx.stroke();
      });

      // Clear Shadow effects for texts & UI overlays
      ctx.shadowBlur = 0;

      // Draw Retro HUD overlay (Scanlines filter)
      ctx.fillStyle = "rgba(18, 18, 18, 0.08)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-[#1c1c1e] text-white font-sans overflow-hidden select-none"
    >
      {/* macOS style Window Header */}
      <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#2c2c2e] border-b border-neutral-800">
        <WindowControls target="dino" />
        <h2 className="font-bold text-sm text-center flex-1 text-gray-200">Dino Jump Game 🦖</h2>
        <div className="w-[52px]" /> {/* Spacer to balance WindowControls */}
      </div>

      {/* Main Game Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-5 bg-[#0a0a0c] relative">
        
        {/* Retro Grid Screen Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.05),rgba(255,255,255,0))]" />

        {/* Dashboard/Scoreboard */}
        <div className="w-full max-w-[560px] flex items-center justify-between mb-3.5 z-10">
          <div className="flex items-center gap-4 text-xs font-mono font-bold tracking-widest text-[#00d8ff]">
            <span>SCORE: <span className="text-white text-sm">{score}</span></span>
            <span>HIGH: <span className="text-white text-sm">{highScore}</span></span>
          </div>

          <div className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border border-neutral-800 text-neutral-500 tracking-wider">
            Retro Mode
          </div>
        </div>

        {/* Game Screen Canvas */}
        <div
          onClick={triggerJump}
          className="relative cursor-pointer border border-neutral-800 rounded-xl overflow-hidden shadow-2xl transition-transform active:scale-[0.99] z-10"
        >
          <canvas
            ref={canvasRef}
            width={560}
            height={200}
            className="block"
          />

          {/* Prompt overlays */}
          {!isPlaying && !isGameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-xs text-center p-4">
              <span className="text-3xl mb-1.5 animate-bounce">🦖</span>
              <h3 className="font-extrabold text-sm uppercase tracking-widest text-[#39ff14]">RETRO RUNNER</h3>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">PRESS SPACEBAR OR CLICK TO START</p>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs text-center p-4">
              <span className="text-3xl mb-1">👾</span>
              <h3 className="font-extrabold text-lg uppercase tracking-wider text-rose-500">GAME OVER</h3>
              <p className="text-[11px] text-neutral-400 font-mono mt-1">YOUR SCORE: <span className="text-white font-bold">{score}</span></p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  restartGame();
                }}
                className="mt-3.5 px-4 py-1.5 bg-[#39ff14]/15 hover:bg-[#39ff14]/25 text-[#39ff14] border border-[#39ff14]/30 rounded-lg text-xs font-bold font-mono tracking-widest transition-all uppercase cursor-pointer"
              >
                PLAY AGAIN (ENTER)
              </button>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="text-[10px] text-neutral-600 font-mono mt-3.5 tracking-wider z-10">
          CONTROL: <span className="text-neutral-400">SPACEBAR / ARROW UP</span> TO JUMP
        </div>
      </div>
    </div>
  );
};

const DinoWindow = WindowWrapper(DinoGame, "dino");

export default DinoWindow;
