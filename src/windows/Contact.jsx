import { WindowControls } from "#components";
import WindowWrapper from "#hoc/windowWrapper";
import { socials } from "#constants/index.js";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="contact-content">
        <img
          src="/images/sarthak.jpeg"
          alt="Sarthak Gupta"
          className="w-16 h-16 rounded-full object-cover border border-gray-200/50 mb-3"
        />
        <h3>Let's Connect</h3>
        <p className="subtitle">
          Got an idea? A bug to squash? Or just wanna talk tech? I'm in.
        </p>

        <ul>
          {socials.map(({ id, text, icon, bg, link }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img
                  src={icon}
                  alt={text}
                  className="brightness-0 invert size-5"
                />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
