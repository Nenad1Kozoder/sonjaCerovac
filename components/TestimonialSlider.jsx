import { useState, useEffect } from "react";
import classes from "./TestimonialSlider.module.scss";

function TestimonialsSlider({ list }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0); // Držimo pomak dok prevlačimo
  const [isMouseOver, setIsMouseOver] = useState(false); // Da li je miša iznad holdera

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && !isMouseOver) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [list.length, isDragging, isMouseOver]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Provera za prevlačenje u levo/desno
    if (diff > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length); // Sledeći slajd
    } else if (diff < -50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? list.length - 1 : prevIndex - 1
      ); // Prethodni slajd
    }

    setTouchStartX(null);
    setDragOffset(0); // Resetujemo pomak nakon prevlačenja
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!startX || !isDragging) return;

    const diff = e.clientX - startX; // Razlika između početne i trenutne pozicije
    setDragOffset(diff); // Držimo pomak koji pratimo dok prevlačimo
  };

  const handleMouseUp = () => {
    if (!startX || !isDragging) return;

    const diff = startX - dragOffset;
    if (diff > 50) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % list.length); // Sledeći slajd
    } else if (diff < -50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? list.length - 1 : prevIndex - 1
      ); // Prethodni slajd
    }

    setStartX(null);
    setIsDragging(false);
    setDragOffset(0); // Resetujemo pomak
  };

  const transformStyle = {
    transform: `translateX(${dragOffset}px)`, // Pomeri slajd u skladu sa prevlačenjem
    transition: isDragging ? "none" : "transform 0.3s ease", // Tranzicija se ne koristi dok se vuče
  };

  return (
    <div
      className={classes.listHolder}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsMouseOver(false)} // Kad miša napusti element, restartuj automatsko pomeranje
      onMouseEnter={() => setIsMouseOver(true)} // Kad je miša iznad, pauziraj automatsko pomeranje
    >
      <ul className={classes.list}>
        <li
          key={list[currentIndex].node.id}
          style={transformStyle} // Primeni transformaciju sa pomakom
          dangerouslySetInnerHTML={{ __html: list[currentIndex].node.content }}
        />
      </ul>
    </div>
  );
}

export default TestimonialsSlider;
