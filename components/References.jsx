const cheerio = require("cheerio");
import Image from "next/image";
import classes from "./References.module.scss";

function References({ references }) {
  const $ = cheerio.load(references);
  const images = [];

  $("img").each((_, img) => {
    images.push({
      src: $(img).attr("src"),
      width: parseInt($(img).attr("width"), 10),
      height: parseInt($(img).attr("height"), 10),
    });
  });

  return (
    <ul className={classes.list}>
      {images.map((image, index) => {
        return (
          <li key={index}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={`referense-${index}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default References;
