import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>UI/UX Design Intern</h4>
                <h5>BICS Global</h5>
              </div>
              <h3>Feb 2025</h3>
            </div>
            <p>
              Designed wireframes, prototypes, and usability tests; collaborated
              with developers to ensure pixel-perfect, consistent UI
              implementation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Data Science Intern</h4>
                <h5>Vcodez</h5>
              </div>
              <h3>Jul–Sep 2025</h3>
            </div>
            <p>
              Developed predictive analytics models and integrated data-driven
              insights to support UX decision-making and feature prioritization.
            </p>
          </div>
                    <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Digital Marketing intern || Graphics Design</h4>
                <h5>DVILITE</h5>
              </div>
              <h3>FEB–MAY 2026</h3>
            </div>
            <p>
              Developed responsive,user-friendly carousels and promotion designs.Applied SEO fundamentals and modern UI/UX practices to improve user engagement.Helped digital marketing team to improve company growth and promotions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
