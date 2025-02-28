import client from "../lib/apolloClient";
import ContactHomeSection from "../components/ContactHomeSection";
import DropdownSection from "../components/DropdownSection";
import TextComponent from "../components/TextComponent";
import { GET_HOME_PAGE } from "@/queries/getHomePage";
import { Fragment } from "react";
import Testimonials from "../components/Testimonials";
import Section from "../components/Section";
import GalleryHome from "../components/GalleryHome";
import References from "../components/References";

export default function Home({ data }) {
  const {
    featuredImage,
    content,
    homeTopSection,
    historySection,
    clinicalExpertiseSection,
    contactHome,
    testimonials,
    galerySection,
    references,
  } = data;

  const topImg = featuredImage.node.sourceUrl;
  const expertises = [
    clinicalExpertiseSection.dropdownOne,
    clinicalExpertiseSection.dropdownTwo,
    clinicalExpertiseSection.dropdownThree,
  ].map((dropdown, index) => ({
    id: index + 1,
    title: dropdown?.title || "",
    description: dropdown?.description || "",
    button: {
      label: dropdown?.button?.label || "",
      links:
        dropdown?.button?.link?.nodes?.map((node) => ({
          uri: node.uri,
          link: node.link,
        })) || [],
    },
  }));

  return (
    <Fragment>
      <Section
        imgUrl={topImg}
        isRight={true}
        title={homeTopSection.title}
        isHome={true}
      >
        <TextComponent
          title={homeTopSection.title}
          description={content}
          suptitle={homeTopSection.pretitle}
          isRight={true}
        />
      </Section>
      <Section isClean={true}>
        <DropdownSection
          title={clinicalExpertiseSection.titleExpertise}
          expertises={expertises}
        />
      </Section>
      <Section
        imgUrl={historySection.backgroundImage.node.sourceUrl}
        title={historySection.titleHistory}
      >
        <TextComponent
          title={historySection.titleHistory}
          description={historySection.description}
        />
      </Section>
      <Section isGrid={true}>
        <ContactHomeSection data={contactHome} />
      </Section>
      <Section
        imgUrl={testimonials.testimonialsBackgroundImage.node.sourceUrl}
        title={testimonials.testimonialsTitle}
      >
        <Testimonials testimonials={testimonials} />
      </Section>
      <Section
        imgUrl={galerySection.galleryBackgroundImage.node.sourceUrl}
        title={galerySection.gellerySectionTitle}
        noOverlay={true}
        isRight={true}
      >
        <GalleryHome data={galerySection} />
      </Section>
      <Section isClean={true}>
        <References references={references.references} />
      </Section>
    </Fragment>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: GET_HOME_PAGE,
  });

  const home =
    data.pages.nodes.find((page) => page.isFrontPage === true) || null;

  return {
    props: {
      data: home,
    },
    revalidate: 10,
  };
}
