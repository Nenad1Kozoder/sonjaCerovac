import { Fragment } from "react";
import client from "../lib/apolloClient";
import { GET_ABOUT } from "@/queries/getAbout";
import Section from "../components/Section";
import TextComponent from "../components/TextComponent";
import Button from "@/components/Button";
import Head from "next/head";

function About({ data }) {
  const { groupSections, content, contactMe, seo = {} } = data.page;

  const sectionKeys = ["first", "second", "third"];

  const aboutSections = sectionKeys.map((key) => {
    const section = groupSections[`${key}Section`];

    return {
      title: section[`${key}Title`],
      description: section[`${key}Description`],
      image: section[`${key}Image`]?.node?.sourceUrl,
    };
  });

  const featuredImage = groupSections.firstSection.firstImage;
  const button = { buttonLabel: contactMe.linkLabel };
  return (
    <Fragment>
      <Head>
        <title>{seo.seoTitle || "Dr. Sonja Cerovic - About"}</title>
        {seo.seoDescription && (
          <meta name="description" content={seo.seoDescription.slice(0, 60)} />
        )}
        {seo.seoKeywodrs && <meta name="keywords" content={seo.seoKeyWodrs} />}
        <meta
          property="og:title"
          content={seo.seoTitle || "Dr. Sonja Cerovic - About"}
        />
        {seo.seoDescription && (
          <meta
            property="og:description"
            content={seo.seoDescription.slice(0, 60)}
          />
        )}
        <meta property="og:image" content={featuredImage.node.sourceUrl} />
        <meta
          name="twitter:title"
          content={seo.seoTitle || "Dr. Sonja Cerovic - About"}
        />
        {seo.seoDescription && (
          <meta
            name="twitter:description"
            content={seo.seoDescription.slice(0, 60)}
          />
        )}
        <meta name="twitter:image" content={featuredImage.node.sourceUrl} />
      </Head>
      {aboutSections.map((section, index) => {
        return (
          <Section
            imgUrl={section.image}
            key={index}
            isBlue={true}
            isRight={index === 1 ? true : false}
            title={section.title}
            isHome={index === 0 ? true : false}
          >
            <TextComponent
              title={section.title}
              description={section.description}
              isRight={index === 1 ? true : false}
              isWhiteTitle={true}
              isFullWidth={index === 0 ? true : false}
            />
          </Section>
        );
      })}
      <Section isClean={true}>
        <TextComponent
          description={content}
          isCenter={true}
          isFullWidth={true}
        />
        <Button variant={"blue"} noArrow={true} button={contactMe} />
      </Section>
    </Fragment>
  );
}

export default About;

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_ABOUT,
  });

  return {
    props: {
      data: data,
    },
    revalidate: 10,
  };
}
