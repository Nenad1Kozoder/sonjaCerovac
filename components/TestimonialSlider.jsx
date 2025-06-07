import { useState, useEffect, useRef } from "react";
import classes from "./TestimonialSlider.module.scss";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    setIsDesktop(check);
  }, []);
  return isDesktop;
}

function TestimonialsSlider({ list }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const itemRefs = useRef([]);

  const isDesktop = useIsDesktop();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMouseOver) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [list.length, isMouseOver]);

  useEffect(() => {
    if (!list || list.length === 0) return;
    itemRefs.current = itemRefs.current.slice(0, list.length);
    setTimeout(() => {
      const heights = itemRefs.current.map((ref) => ref?.offsetHeight || 0);
      setMaxHeight(Math.max(...heights));
    }, 0);
  }, [list]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
  };

  const handleClick = (e) => {
    if (e.button === 0) {
      // levi klik ili tap
      nextSlide();
    }
  };

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 15, y: e.clientY + 15 }); // pomeraj tooltipa
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
    setShowTooltip(false);
  };

  return (
    <div
      className={classes.listHolder}
      style={{ height: maxHeight }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
    >
      {isDesktop && showTooltip && (
        <div
          className={classes.tooltip}
          style={{
            position: "fixed",
            top: tooltipPos.y,
            left: tooltipPos.x,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Click to advance
        </div>
      )}
      <ul className={classes.list}>
        {!isDesktop && (
          <div className={classes.mobileMessage}>{"(Tap to advance)"}</div>
        )}
        {list.map((item, index) => (
          <li
            key={item.node.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`${classes.item} ${
              index === currentIndex ? classes.active : classes.inactive
            }`}
            dangerouslySetInnerHTML={{ __html: item.node.content }}
          />
        ))}
      </ul>
    </div>
  );
}

export default TestimonialsSlider;
