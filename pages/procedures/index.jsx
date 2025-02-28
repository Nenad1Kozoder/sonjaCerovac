import { Fragment } from "react";
import client from "@/lib/apolloClient";
import { GET_PROCEDURES } from "@/queries/getProcedures";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import Button from "@/components/Button";

function Procedures({ data }) {
  const { topSection, featuredImage, groupSections, content, contactMe } = data;

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
  console.log(groupSectionsClean);
  return (
    <Fragment>
      <Section
        imgUrl={featuredImage.node.sourceUrl}
        title={topSection.topTitle}
      >
        <TextComponent
          title={topSection.topTitle}
          description={topSection.topDescription}
          isWhiteTitle={true}
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
        <TextComponent description={content} isCenter={true} />
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
