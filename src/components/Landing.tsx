import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              L.V
              <br />
              <span>RESHMA SHREE</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>UI/UX Designer & Frontend Developer</h3>
            <div className="landing-info-h2">
              <div className="landing-h2-1">UI/UX</div>
              <div className="landing-h2-2">Frontend</div>
            </div>
            <div className="landing-info-copy">
              <div className="landing-h2-info">Human-centered designs</div>
              <div className="landing-h2-info-1">Prototyping & Research</div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Landing;
