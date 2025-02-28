import Button from "./Button";
import classes from "./TextComponent.module.scss";

function TextComponent({
  title,
  suptitle,
  description,
  isRight,
  isCenter,
  isWhiteTitle,
  button,
}) {
  const customClasses = [
    classes.textHolder,
    isRight && classes.textHolderRight,
    isCenter && classes.textHolderCenter,
    isWhiteTitle && classes.isWhiteTitle,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={customClasses}>
      {suptitle && <h3>{suptitle}</h3>}
      {title && <h2>{title}</h2>}
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
