import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

// Register only ScrollTrigger by default; ScrollSmoother (trial) will be
// dynamically imported if available.
gsap.registerPlugin(ScrollTrigger);
export let smoother: any = null;

const Navbar = () => {
  useEffect(() => {
    let mounted = true;

    // Try to dynamically import ScrollSmoother (greensock trial plugin).
    // Import via a variable so Vite won't statically analyze and fail the dev server.
    const _pluginPath = "gsap-trial/ScrollSmoother";
    try {
      // @ts-ignore
      import(/* @vite-ignore */ _pluginPath)
        .then((mod) => {
          if (!mounted) return;
          const ScrollSmoother = mod?.ScrollSmoother || mod?.default || null;
          if (!ScrollSmoother) {
            smoother = createSmootherStub();
            return;
          }
          try {
            gsap.registerPlugin(ScrollSmoother);
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1.7,
              speed: 1.7,
              effects: true,
              autoResize: true,
              ignoreMobileResize: true,
            });
          } catch (e) {
            // If creation fails, fallback to a minimal stub so other code can call methods safely
            smoother = createSmootherStub();
          }
          try {
            smoother.scrollTop(0);
            smoother.paused(true);
          } catch (e) {}
        })
        .catch(() => {
          // plugin not available — create stub smoother so calls elsewhere don't crash
          smoother = createSmootherStub();
        });
    } catch (e) {
      smoother = createSmootherStub();
    }

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      // refresh if plugin exists
      try {
        // @ts-ignore
        if (window?.ScrollSmoother) window.ScrollSmoother.refresh(true);
      } catch (e) {}
    });
    return () => {
      mounted = false;
      window.removeEventListener("resize", () => {});
    };
  }, []);

// Minimal smoother stub to prevent runtime errors when ScrollSmoother isn't available
function createSmootherStub() {
  return {
    scrollTop: () => {},
    scrollTo: () => {},
    // single paused handler that accepts any args (prevents unused-param errors)
    paused: (..._args: any[]) => {},
    kill: () => {},
  };
}
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Logo
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          example@mail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
