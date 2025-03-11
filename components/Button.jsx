import { FaArrowUpLong } from "react-icons/fa6";
import Link from "next/link";
import classes from "./Button.module.scss";

function Button({ button, variant, noArrow, isExternal }) {
  return (
    <Link
      className={`${classes.button} ${
        variant === "blue" ? classes.blue : classes.white
      } ${noArrow ? classes.noArrow : ""}`}
      href={button.buttonLink || button.pageLink.nodes[0].uri}
      target={isExternal ? "_blank" : "_self"}
    >
      <span className={classes.labelHolder}>
        {button.buttonLabel || button.linkLabel}
      </span>
      {!noArrow ? (
        <span className={classes.arrowHolder}>
          <FaArrowUpLong />
        </span>
      ) : (
        ""
      )}
    </Link>
  );
}

export default Button;
