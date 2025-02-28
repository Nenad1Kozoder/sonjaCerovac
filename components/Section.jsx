import Image from "next/image";
import classes from "./Section.module.scss";

function Section({
  isRight,
  imgUrl,
  title,
  children,
  isClean,
  isGrid,
  isSmallImg,
  isBlue,
  noOverlay,
  isHome,
  customClass,
}) {
  const customClasses = [
    classes.section,
    isRight && classes.isRight,
    isClean && classes.cleanSection,
    isGrid && classes.gridSection,
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
      {imgUrl && (
        <Image
          className={classes.SectionImage}
          src={imgUrl}
          fill
          priority
          alt={title}
        />
      )}
      {children}
    </section>
  );
}

export default Section;
