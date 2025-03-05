import Title from "./Title";
import Link from "next/link";
import classes from "./GalleryHome.module.scss";

function GalleryHome({ data }) {
  const galleries = data.selectGalleries.edges;

  return (
    <div className={classes.holder}>
      <Title as="h2" className="whiteLarge">
        {data.gellerySectionTitle}
      </Title>
      <ul className={classes.list}>
        {galleries.map((gallery, index) => {
          return (
            <li key={index}>
              <Link className={classes.link} href={gallery.node.uri}>
                {gallery.node.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default GalleryHome;
