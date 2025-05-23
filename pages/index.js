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
import Head from "next/head";

export default function Home({ data }) {
  const {
    featuredImage,
    content,
    homeTopSection,
    historySection,
    clinicalExpertiseSection,
    contactHome,
    testimonials,
    gallerySection,
    references,
    seo = {},
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
      <Head>
        <title>{seo.seoTitle || homeTopSection.title}</title>
        {seo.seoDescription && (
          <meta name="description" content={seo.seoDescription.slice(0, 60)} />
        )}
        {seo.seoKeywodrs && <meta name="keywords" content={seo.seoKeyWodrs} />}
        <meta
          property="og:title"
          content={seo.seoTitle || homeTopSection.title}
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
          content={seo.seoTitle || homeTopSection.title}
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
        imgUrl={topImg}
        isRight={true}
        title={homeTopSection.title}
        isHome={true}
        noOverlay={true}
      >
        <TextComponent
          title={homeTopSection.title}
          titleDecoration="<span>○</span>"
          description={content}
          suptitle={homeTopSection.pretitle}
          isRight={true}
          isFullWidth={true}
        />
      </Section>
      <Section isClean={true}>
        <DropdownSection
          title={clinicalExpertiseSection.titleExpertise}
          expertises={expertises}
        />
      </Section>
      <Section
        imgUrl={gallerySection.galleryBackgroundImage.node.sourceUrl}
        title={gallerySection.gellerySectionTitle}
        noOverlay={true}
      >
        <GalleryHome data={gallerySection} />
      </Section>
      <Section
        imgUrl={testimonials.testimonialsBackgroundImage.node.sourceUrl}
        title={testimonials.testimonialsTitle}
      >
        <Testimonials testimonials={testimonials} />
      </Section>
      <Section isGrid={true} isWhite={true}>
        <ContactHomeSection data={contactHome} />
      </Section>
      <Section
        imgUrl={historySection.backgroundImage.node.sourceUrl}
        title={historySection.titleHistory}
      >
        <TextComponent
          title={historySection.titleHistory}
          description={historySection.description}
          isWhiteTitle={true}
          isFullWidth={true}
        />
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
    data.pages && data.pages.nodes.find((page) => page.isFrontPage === true);

  return {
    props: {
      data: home,
    },
    revalidate: 10,
  };
}
