import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const FONT_WEIGHT = {
  subtitle: { min: 200, max: 400, base: 200 },
  title: { min: 400, max: 900, base: 400 },
};

const renderText = (text, className, baseWeight = 400) =>
  [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: "inline-block",
        fontVariationSettings: `"wght" var(--wght)`,
        "--wght": `${baseWeight}`,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, base } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      ["--wght"]: weight,
    });
  };

  const handleMouseEnter = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2.5) / 20000); // Decay factor

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () =>
    letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseEnter);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseEnter);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  useGSAP(() => {
    const titleCleaup = setupTextHover(titleRef.current, "title");
    const subtitleCleaup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleaup();
      subtitleCleaup();
    };
  }, []);
  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey,I'm Alankar! Welcome to",
          "text-3xl font-georama",
          200
        )}{" "}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is designed for Desktop/ Tablet screen only</p>
      </div>
    </section>
  );
};

export default Welcome;
