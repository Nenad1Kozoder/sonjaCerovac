import client from "../../lib/apolloClient";
import { useRouter } from "next/router";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { Fragment, useState } from "react";
import { GET_GALLERIES, GET_GALLERY } from "@/queries/getGallery";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import classes from "./gallery.module.scss";
import Head from "next/head";
const cheerio = require("cheerio");

export default function GalleryPage({
  gallery,
  images,
  prevGallery,
  nextGallery,
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const navigation = [prevGallery, nextGallery];

  if (router.isFallback) return <p>Loading...</p>;
  if (!gallery) return <p>Gallery not found</p>;

  const { seo = {}, featuredImage, title } = gallery;

  return (
    <Fragment>
      <Head>
        <title>{seo.seoTitle || title}</title>
        {seo.seoDescription && (
          <meta name="description" content={seo.seoDescription.slice(0, 60)} />
        )}
        {seo.seoKeywodrs && <meta name="keywords" content={seo.seoKeyWodrs} />}
        <meta property="og:title" content={seo.seoTitle || title} />
        {seo.seoDescription && (
          <meta
            property="og:description"
            content={seo.seoDescription.slice(0, 60)}
          />
        )}
        <meta property="og:image" content={featuredImage.node.sourceUrl} />
        <meta name="twitter:title" content={seo.seoTitle || title} />
        {seo.seoDescription && (
          <meta
            name="twitter:description"
            content={seo.seoDescription.slice(0, 60)}
          />
        )}
        <meta name="twitter:image" content={featuredImage.node.sourceUrl} />
      </Head>
      <Section
        imgUrl={featuredImage.node.sourceUrl}
        title={title}
        customClass="isGallery"
        navigation={navigation}
      >
        <TextComponent title={title} isBottom={true} isWhiteTitle={true} />
      </Section>

      <Section isWhite={true}>
        <ul className={classes.list}>
          {images.map((image, idx) => (
            <li key={idx}>
              <figure>
                <img
                  src={image.src}
                  alt={image.caption}
                  onClick={() => {
                    setIndex(idx);
                    setOpen(true);
                  }}
                />
                <figcaption>{image.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Lightbox
        open={open}
        plugins={[Captions]}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((img) => ({
          src: img.src,
          title: img.caption,
        }))}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_GALLERIES });

  const paths = data.galleries.nodes.map((gallery) => ({
    params: { slug: gallery.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { data: galleryData } = await client.query({
    query: GET_GALLERY,
    variables: { slug: params.slug },
  });

  const { data: galleriesData } = await client.query({ query: GET_GALLERIES });

  const galleries = galleriesData.galleries.nodes;
  const currentIndex = galleries.findIndex((g) => g.slug === params.slug);

  const prevGallery =
    galleries[(currentIndex - 1 + galleries.length) % galleries.length];
  const nextGallery = galleries[(currentIndex + 1) % galleries.length];

  const $ = cheerio.load(galleryData.galleryBy.content);
  const images = $("dl.gallery-item")
    .map((_, el) => {
      const src = $(el).find("img").attr("src");
      const caption = $(el).find(".gallery-caption").text().trim();

      return { src, caption };
    })
    .get();

  return {
    props: {
      gallery: galleryData.galleryBy || null,
      images,
      prevGallery,
      nextGallery,
    },
    revalidate: 10,
  };
}
