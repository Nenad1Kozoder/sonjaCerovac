import classes from "./TreatmentSlider.module.scss";
import arrow from "../public/arrowGreen.svg";
import Image from "next/image";

const TreatmentSlider = ({
  treatments,
  prevSlide,
  nextSlide,
  currentIndex,
}) => {
  return (
    <div className={classes.sliderHoder}>
      <button className={classes.button} onClick={prevSlide}>
        <Image width={18.5} height={26} src={arrow} alt="arrow" />
      </button>
      <div className={classes.slider}>
        <ul
          className={classes.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {treatments.map((category, index) => (
            <li key={index} className={classes.slide}>
              {category}
            </li>
          ))}
        </ul>
      </div>
      <button className={classes.button} onClick={nextSlide}>
        <Image width={18.5} height={26} src={arrow} alt="arrow" />
      </button>
    </div>
  );
};

export default TreatmentSlider;
