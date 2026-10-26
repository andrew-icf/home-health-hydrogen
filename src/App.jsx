import { useEffect, useState } from "react";
import "./App.css";
import healthPhoto from "./assets/health.png";
import homePhoto from "./assets/home.png";
import hydrogenPhoto from "./assets/hydrogen.png";
import hydrogenMobilePhoto from "./assets/hydrogen-mobile.png";
import healthMobilePhoto from "./assets/health-mobile.png";
import homeMobilePhoto from "./assets/home-mobile.png";

const PANELS = [
  {
    id: "home",
    href: "https://ashleyvandermeerrealestate.com/",
    eyebrow: "Real Estate",
    title: "Home",
    tagline: "Find your place",
    tone: "home",
    image: homePhoto,
    mobileImage: homeMobilePhoto,
  },
  {
    id: "health",
    href: "https://ibodyscan.com/",
    eyebrow: "Quantum Bio-Resonance Scan",
    title: "Health",
    tagline: "Know your body",
    tone: "health",
    image: healthPhoto,
    mobileImage: healthMobilePhoto,
  },
  {
    id: "hydrogen",
    href: "https://drashleyvandermeer.com/",
    eyebrow: "Molecular Hydrogen Water",
    title: "Hydrogen",
    tagline: "Drink the difference",
    tone: "hydrogen",
    image: hydrogenPhoto,
    mobileImage: hydrogenMobilePhoto,
  },
];

function useIsMobile(breakpoint = 780) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function App() {
  const [activeId, setActiveId] = useState(null);
  const isMobile = useIsMobile();

  return (
    <main className="doors" aria-label="Choose a destination">
      {PANELS.map((panel) => {
        const src = isMobile && panel.mobileImage ? panel.mobileImage : panel.image;
        return (
          <a
            key={panel.id}
            href={panel.href}
            className={`door door--${panel.tone}`}
            data-dimmed={activeId !== null && activeId !== panel.id}
            onMouseEnter={() => setActiveId(panel.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(panel.id)}
            onBlur={() => setActiveId(null)}
          >
            <span
              className="door__scene"
              style={{ backgroundImage: `url(${src})` }}
              aria-hidden="true"
            />
            <span className="door__scrim" aria-hidden="true" />
            <span className="door__content">
              <span className="door__hairline" aria-hidden="true" />
              <span className="door__eyebrow">{panel.eyebrow}</span>
              <span className="door__title">{panel.title}</span>
              <span className="door__tagline">{panel.tagline}</span>
            </span>
          </a>
        );
      })}
    </main>
  );
}
