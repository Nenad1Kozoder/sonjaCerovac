import client from "../lib/apolloClient";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import { GET_CONTACT } from "@/queries/getContactPage";
import { Fragment } from "react";
import Image from "next/image";
import classes from "./contact-me.module.scss";
import Head from "next/head";

function ContactMe({ data }) {
  const { featuredImage, title: pageTitle, contactInformation } = data;

  const {
    title,
    description,
    qrDescription,
    hospitalLogo,
    qrCode,
    seo = {},
  } = contactInformation;

  return (
    <Fragment>
      <Head>
        <title>{seo.seoTitle || pageTitle}</title>
        {seo.seoDescription && (
          <meta name="description" content={seo.seoDescription.slice(0, 60)} />
        )}
        {seo.seoKeywodrs && <meta name="keywords" content={seo.seoKeyWodrs} />}
        <meta property="og:title" content={seo.seoTitle || pageTitle} />
        {seo.seoDescription && (
          <meta
            property="og:description"
            content={seo.seoDescription.slice(0, 60)}
          />
        )}
        <meta property="og:image" content={featuredImage.node.sourceUrl} />
        <meta name="twitter:title" content={seo.seoTitle || pageTitle} />
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
        title={pageTitle}
        customClass="isGallery"
        isBlue={true}
      >
        <TextComponent title={pageTitle} isBottom={true} isWhiteTitle={true} />
      </Section>
      <div className={classes.holder}>
        <div className={classes.description}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className={classes.app}>
          <Image
            src={hospitalLogo.node.sourceUrl}
            width={0}
            height={0}
            sizes="100vw"
            alt="logo"
          />
          <Image
            src={qrCode.node.sourceUrl}
            width={0}
            height={0}
            sizes="100%"
            alt="qr-code"
          />
          <p>{qrDescription}</p>
        </div>
      </div>
    </Fragment>
  );
}

export default ContactMe;

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_CONTACT,
  });

  return {
    props: {
      data: data.page,
    },
    revalidate: 10,
  };
}
