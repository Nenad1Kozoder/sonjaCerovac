import { Fragment } from "react";
import client from "@/lib/apolloClient";
import { GET_PROCEDURES } from "@/queries/getProcedures";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import Button from "@/components/Button";
import Head from "next/head";

function Procedures({ data }) {
  const {
    topSection,
    featuredImage,
    groupSections,
    content,
    contactMe,
    seo = {},
  } = data;

  const sectionKeys = ["first", "second", "third"];

  const groupSectionsClean = sectionKeys.map((key) => {
    const section = groupSections[`${key}Section`];

    return {
      title: section[`${key}Title`],
      description: section[`${key}Description`],
      image: section[`${key}Image`]?.node?.sourceUrl,
      button: {
        buttonLink: section[`${key}Treatment`].nodes[0].uri,
        buttonLabel: "Treatments",
      },
    };
  });

  return (
    <Fragment>
      <Head>
        <title>{seo.seoTitle || "Dr. Sonja Cerovic - Procedures"}</title>
        {seo.seoDescription && (
          <meta name="description" content={seo.seoDescription.slice(0, 60)} />
        )}
        {seo.seoKeywodrs && <meta name="keywords" content={seo.seoKeyWodrs} />}
        <meta
          property="og:title"
          content={seo.seoTitle || "Dr. Sonja Cerovic - Procedures"}
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
          content={seo.seoTitle || "Dr. Sonja Cerovic - Procedures"}
        />
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
        title={topSection.topTitle}
        isHome={true}
        noOverlay={true}
      >
        <TextComponent
          title={topSection.topTitle}
          description={topSection.topDescription}
          isWhiteTitle={true}
          isFullWidth={true}
        />
      </Section>
      {groupSectionsClean.map((section, index) => {
        return (
          <Section
            imgUrl={section.image}
            key={index}
            isSmallImg={true}
            customClass={`isGreen_${index + 1}`}
            isRight={index === 1 ? true : false}
            title={section.title}
          >
            <TextComponent
              title={section.title}
              description={section.description}
              isRight={index === 1 ? true : false}
              isWhiteTitle={true}
              button={section.button}
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

export default Procedures;

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_PROCEDURES,
  });

  return {
    props: {
      data: data.page,
    },
    revalidate: 10,
  };
}
