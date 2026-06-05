import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import projects from "../data/projectsData";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let translateX: number = 0;
    let timeline: gsap.core.Timeline | null = null;

    function setTranslateX() {
      const box = document.getElementsByClassName(
        "work-box"
      ) as HTMLCollectionOf<HTMLElement>;
      if (!box || box.length === 0) {
        translateX = 0;
        return;
      }

      const container = document.querySelector(
        ".work-container"
      ) as HTMLElement | null;
      if (!container) {
        translateX = 0;
        return;
      }

      let totalWidth = 0;
      for (let i = 0; i < box.length; i++) {
        totalWidth += box[i].getBoundingClientRect().width;
      }

      const containerWidth = container.getBoundingClientRect().width;
      const style = window.getComputedStyle(box[0]);
      const padLeft = parseFloat(style.paddingLeft || "0") || 0;
      const padRight = parseFloat(style.paddingRight || "0") || 0;
      const padding = (padLeft + padRight) / 2;
      translateX = Math.max(0, totalWidth - containerWidth + padding);

      if (translateX <= 0) {
        container.classList.add("work-scroll-native");
      } else {
        container.classList.remove("work-scroll-native");
      }
    }

    function initTimeline() {
      // On mobile: kill any existing pin and let CSS vertical layout take over
      if (window.innerWidth <= 767) {
        if (timeline) {
          try {
            timeline.kill();
          } catch (e) {}
          ScrollTrigger.getById("work")?.kill();
          timeline = null;
        }
        const workFlex = document.querySelector(
          ".work-flex"
        ) as HTMLElement | null;
        if (workFlex) gsap.set(workFlex, { clearProps: "all" });
        const workSection = document.querySelector(
          ".work-section"
        ) as HTMLElement | null;
        if (workSection) gsap.set(workSection, { clearProps: "all" });
        return;
      }

      setTranslateX();

      if (timeline) {
        try {
          timeline.kill();
        } catch (e) {}
        ScrollTrigger.getById("work")?.kill();
        timeline = null;
      }

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: `+=${translateX}`,
          scrub: true,
          pin: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });

      ScrollTrigger.refresh();
    }

    initTimeline();

    const onResize = () => {
      initTimeline();
    };

    window.addEventListener("resize", onResize);

    const imgs = Array.from(document.images);
    let loadedCount = 0;
    if (imgs.length > 0) {
      imgs.forEach((img) => {
        if (img.complete) {
          loadedCount++;
        } else {
          img.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === imgs.length) initTimeline();
          });
        }
      });
      if (loadedCount === imgs.length) initTimeline();
    }

    return () => {
      try {
        timeline?.kill();
      } catch (e) {}
      ScrollTrigger.getById("work")?.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>

                <div className="work-meta">
                  {project.type && (
                    <span className="work-type-badge">{project.type}</span>
                  )}
                  <h4>Role</h4>
                  <p>{project.role}</p>
                  <h4>Tools</h4>
                  <p>{project.tools}</p>
                  <h4>About</h4>
                  <p className="work-desc">{project.description}</p>
                </div>
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
