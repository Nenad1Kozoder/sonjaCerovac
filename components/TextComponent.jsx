import { Fragment } from "react";
import BackButton from "./BackButton";
import Button from "./Button";
import classes from "./TextComponent.module.scss";
import Link from "next/link";
import arrowLeft from "../public/arrow_left_white.svg";
import arrowRight from "../public/arrow_right_white.svg";
import Image from "next/image";

function TextComponent({
  title,
  suptitle,
  description,
  isRight,
  isCenter,
  isBottom,
  isWhiteTitle,
  hasBackBtn,
  button,
  navigation,
  titleDecoration,
  isFullWidth,
}) {
  const customClasses = [
    classes.textHolder,
    isRight && classes.textHolderRight,
    isCenter && classes.textHolderCenter,
    isWhiteTitle && classes.isWhiteTitle,
    isBottom && classes.isBottom,
    isFullWidth && classes.isFullWidth,
  ]
    .filter(Boolean)
    .join(" ");

  if (titleDecoration) {
    title.replace(/ /g, titleDecoration);
  }

  return (
    <div className={customClasses}>
      {navigation ? (
        <Fragment>
          <Link
            className={classes.arrowLeft}
            href={`/gallery/${navigation[0].slug}`}
            passHref
          >
            <Image width={17} height={21} src={arrowLeft} alt="arrowLeft" />
          </Link>
          <Link
            className={classes.arrowRight}
            href={`/gallery/${navigation[1].slug}`}
            passHref
          >
            <Image width={17} height={21} src={arrowRight} alt="arrowRight" />
          </Link>
        </Fragment>
      ) : (
        ""
      )}

      {hasBackBtn && <BackButton />}
      {suptitle && <h3>{suptitle}</h3>}
      {title && (
        <h2
          dangerouslySetInnerHTML={{
            __html: titleDecoration
              ? title.replace(/ /g, titleDecoration)
              : title,
          }}
        ></h2>
      )}
      {description && (
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {button ? <Button button={button} /> : ""}
    </div>
  );
}

export default TextComponent;
