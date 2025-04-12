import classes from "./TreatmentSlider.module.scss";

const TreatmentSlider = ({
  prevSlide,
  nextSlide,
  currentIndex,
  isGreenBg,
  categories,
}) => {
  return (
    <div className={classes.sliderHoder}>
      <button
        className={`${classes.button} ${isGreenBg && classes.buttonWhite}`}
        onClick={prevSlide}
      >
        <svg
          width="19"
          height="26"
          viewBox="0 0 19 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 26V0L18.5 11.5L0 26Z" fill="#36A9A0" />
        </svg>{" "}
      </button>
      <div className={classes.slider}>
        <ul
          className={classes.sliderTrack}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {categories &&
            categories.map((category, index) => (
              <li key={index} className={classes.slide}>
                {category.name || category}
              </li>
            ))}
        </ul>
      </div>
      <button
        className={`${classes.button} ${isGreenBg && classes.buttonWhite}`}
        onClick={nextSlide}
      >
        <svg
          width="19"
          height="26"
          viewBox="0 0 19 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 26V0L18.5 11.5L0 26Z" fill="#36A9A0" />
        </svg>{" "}
      </button>
    </div>
  );
};

export default TreatmentSlider;
