import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import arrowLeft from "../public/arrow_left_white.svg";
import arrowRight from "../public/arrow_right_white.svg";
import classes from "./Section.module.scss";

function Section({
  isRight,
  imgUrl,
  title,
  children,
  isClean,
  isGrid,
  isWhite,
  isSmallImg,
  isBlue,
  noOverlay,
  isHome,
  customClass,
  navigation,
}) {
  const customClasses = [
    classes.section,
    isRight && classes.isRight,
    isClean && classes.cleanSection,
    isGrid && classes.gridSection,
    isWhite && classes.whiteSection,
    noOverlay && classes.noOverlay,
    isBlue && classes.isBlueOverlay,
    isHome && classes.isHome,
    isSmallImg && classes.isImgSmall,
    customClass && classes[customClass],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={customClasses}>
      {navigation ? (
        <Fragment>
          <Link
            className={classes.arrowLeft}
            href={`/gallery/${navigation[0].slug}`}
            passHref
          >
            <Image width={34} height={38} src={arrowLeft} alt="arrowLeft" />
          </Link>
          <Link
            className={classes.arrowRight}
            href={`/gallery/${navigation[1].slug}`}
            passHref
          >
            <Image width={34} height={38} src={arrowRight} alt="arrowRight" />
          </Link>
        </Fragment>
      ) : (
        ""
      )}

      {imgUrl && (
        <Image
          className={classes.SectionImage}
          src={imgUrl}
          fill
          alt={title}
          priority={isHome ? true : false}
        />
      )}
      {children}
    </section>
  );
}

export default Section;
