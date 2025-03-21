import client from "../../lib/apolloClient";
import { useRouter } from "next/router";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fragment, useState } from "react";
const cheerio = require("cheerio");
import { GET_GALLERIES, GET_GALLERY } from "@/queries/getGallery";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import classes from "./gallery.module.scss";
import Head from "next/head";

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
          {images.map((src, idx) => (
            <li key={idx}>
              <img
                src={src}
                alt={`Gallery image ${idx}`}
                onClick={() => {
                  setIndex(idx);
                  setOpen(true);
                }}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
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
  const images = $("img")
    .map((_, img) => $(img).attr("src"))
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
