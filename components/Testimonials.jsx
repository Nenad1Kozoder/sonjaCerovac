import classes from "./Testimonials.module.scss";
import TestimonialsSlider from "./TestimonialSlider";
import Title from "./Title";
import { Fragment } from "react";

function Testimonials({ testimonials }) {
  const list = testimonials.selectTestimonials.edges;

  return (
    <Fragment>
      <div className={classes.contentHolder}>
        <Title as="h2" className="whiteLarge">
          {testimonials.testimonialsTitle}
        </Title>
        <Title as="h4" className="whiteSmall">
          {testimonials.testimonialsSubtitle}
        </Title>
        <TestimonialsSlider list={list} />
      </div>
    </Fragment>
  );
}

export default Testimonials;
