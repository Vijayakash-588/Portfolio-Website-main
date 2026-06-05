import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
  let translateX: number = 0;

  let timeline: gsap.core.Timeline | null = null;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box") as HTMLCollectionOf<HTMLElement>;
    if (!box || box.length === 0) {
      translateX = 0;
      return;
    }

    const container = document.querySelector(".work-container") as HTMLElement | null;
    if (!container) {
      translateX = 0;
      return;
    }

    // Sum total width of all boxes to get content width
    let totalWidth = 0;
    for (let i = 0; i < box.length; i++) {
      totalWidth += box[i].getBoundingClientRect().width;
    }

    const containerWidth = container.getBoundingClientRect().width;

    // Account for horizontal paddings/margins if any on a box
    const style = window.getComputedStyle(box[0]);
    const padLeft = parseFloat(style.paddingLeft || "0") || 0;
    const padRight = parseFloat(style.paddingRight || "0") || 0;
    const padding = (padLeft + padRight) / 2;

    // translateX is how far we need to move content to hide the overflow
    translateX = Math.max(0, totalWidth - containerWidth + padding);

    // If there is no overflow, allow a native horizontal scroll fallback
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
        try { timeline.kill(); } catch (e) {}
        ScrollTrigger.getById("work")?.kill();
        timeline = null;
      }
      // Reset any GSAP inline transforms so CSS can position freely
      const workFlex = document.querySelector(".work-flex") as HTMLElement | null;
      if (workFlex) gsap.set(workFlex, { clearProps: "all" });
      const workSection = document.querySelector(".work-section") as HTMLElement | null;
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

    // ensure ScrollTrigger knows about new measurements
    ScrollTrigger.refresh();
  }

  // initialize and re-init on resize or when images load
  initTimeline();

  const onResize = () => {
    initTimeline();
  };

  window.addEventListener("resize", onResize);

  // watch for images/media that might affect layout
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
          {[...Array(6)].map((_value, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Project Name</h4>
                    <p>Category</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>Javascript, TypeScript, React, Threejs</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
