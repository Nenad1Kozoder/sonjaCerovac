import client from "../lib/apolloClient";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import { GET_CONTACT } from "@/queries/getContactPage";
import { Fragment } from "react";
import Image from "next/image";
import classes from "./contact-me.module.scss";

function ContactMe({ data }) {
  const { featuredImage, title: pageTitle, contactInformation } = data;

  const { title, description, qrDescription, hospitalLogo, qrCode } =
    contactInformation;

  return (
    <Fragment>
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
            width="216"
            height="126"
            alt="logo"
          />
          <Image
            src={qrCode.node.sourceUrl}
            width="252"
            height="252"
            alt="logo"
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
