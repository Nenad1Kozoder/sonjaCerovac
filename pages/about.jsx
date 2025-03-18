import { Fragment } from "react";
import client from "../lib/apolloClient";
import { GET_ABOUT } from "@/queries/getAbout";
import Section from "../components/Section";
import TextComponent from "../components/TextComponent";
import Button from "@/components/Button";

function About({ data }) {
  const { groupSections, content, contactMe } = data.page;

  const sectionKeys = ["first", "second", "third"];

  const aboutSections = sectionKeys.map((key) => {
    const section = groupSections[`${key}Section`];

    return {
      title: section[`${key}Title`],
      description: section[`${key}Description`],
      image: section[`${key}Image`]?.node?.sourceUrl,
    };
  });

  const button = { buttonLabel: contactMe.linkLabel };
  return (
    <Fragment>
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
