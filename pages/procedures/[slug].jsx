import client from "@/lib/apolloClient";
import { GET_PAGE_BY_SLUG } from "@/queries/getPageBySlug";
import { GET_ALL_PAGES_SLUGS } from "@/queries/getAllPagesSlugs";
import { GET_TREATMENTS } from "@/queries/getTreatments";
import { Fragment, useState } from "react";
import TreatmentSlider from "@/components/TreatmentSlider";
import { FaAngleDown } from "react-icons/fa6";

import classes from "./[slug].module.scss";
import Section from "@/components/Section";
import TextComponent from "@/components/TextComponent";
import { GET_TAGS } from "@/queries/getTags";

function Page({ page, treatments, tags }) {
  const [activeTab, setActiveTab] = useState("tab0");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  console.log("treatments: ", treatments);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!page) return <div>Page not found</div>;

  const transformedTreatments = treatments.treatments.nodes.map((treatment) => {
    const category1 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[0].node.name
        : null;
    const category2 =
      treatment.categories.edges.length > 1
        ? treatment.categories.edges[1].node.name
        : null;

    const categorySlug1 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[0].node.slug
        : null;
    const categorySlug2 =
      treatment.categories.edges.length > 1
        ? treatment.categories.edges[1].node.slug
        : null;

    const tags =
      treatment.tags.edges.length > 0
        ? treatment.tags.edges.map((edge) => edge.node.name)
        : [];

    const tagSlugs =
      treatment.tags.edges.length > 0
        ? treatment.tags.edges.map((edge) => edge.node.slug)
        : [];
    const menuOrder = treatment.menuOrder ? treatment.menuOrder : null;

    return {
      title: treatment.title,
      content: treatment.content,
      category1,
      category2,
      categorySlug1,
      categorySlug2,
      tags,
      tagSlugs,
      menuOrder,
    };
  });

  const filterByCategorySlug = (catSlug) => {
    return transformedTreatments
      .filter((treatment) =>
        [treatment.categorySlug1, treatment.categorySlug2].includes(catSlug)
      )
      .sort((a, b) => b.menuOrder - a.menuOrder)
      .map((treatment) => {
        const updatedTreatment = { ...treatment };
        const categories = [
          {
            slug: updatedTreatment.categorySlug1,
            category: "category1",
            slugField: "categorySlug1",
          },
          {
            slug: updatedTreatment.categorySlug2,
            category: "category2",
            slugField: "categorySlug2",
          },
        ];

        categories.forEach(({ slug, category, slugField }) => {
          if (slug === catSlug) {
            updatedTreatment.category =
              updatedTreatment[
                category === "category1" ? "category2" : "category1"
              ];
            updatedTreatment.categorySlug =
              updatedTreatment[
                slugField === "categorySlug1"
                  ? "categorySlug2"
                  : "categorySlug1"
              ];

            delete updatedTreatment[category];
            delete updatedTreatment[slugField];
          }
        });

        return updatedTreatment;
      });
  };
  const pageTreatments = filterByCategorySlug(page.slug);
  console.log("pageTreatments: ", pageTreatments);
  const uniqueCategories = pageTreatments[0].category && [
    ...new Set(pageTreatments.map((treatment) => treatment.category)),
  ];
  const tabsTreatments = pageTreatments.filter((treatment) =>
    treatment.category
      ? treatment.category.includes(uniqueCategories[currentIndex])
      : treatment
  );
  const uniqueTags = [
    ...new Set(
      tabsTreatments.flatMap((treatment) => treatment.tags.map((tag) => tag))
    ),
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? uniqueCategories.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === uniqueCategories.length - 1 ? 0 : prevIndex + 1
    );
  };
  const colorClass = page.slug.replaceAll("-", "");
  const tagNames = tags.map((tag) => tag.name);

  uniqueTags.sort((a, b) => tagNames.indexOf(a) - tagNames.indexOf(b));

  return (
    <Fragment>
      {page.featuredImage && (
        <Section
          imgUrl={page.featuredImage.node.sourceUrl}
          title={page.title}
          customClass={colorClass}
          isHome={true}
        >
          <TextComponent
            title={page.title}
            description={page.content}
            isWhiteTitle={true}
            hasBackBtn={true}
          />
        </Section>
      )}
      <div className={`${classes.contentHolder} ${classes[colorClass]}`}>
        {uniqueCategories ? (
          <Fragment>
            <div className={classes.filterTags}>
              <TreatmentSlider
                currentIndex={currentIndex}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                treatments={uniqueCategories}
              />
            </div>
            <h2 className={classes.title}>Treatment Types</h2>
          </Fragment>
        ) : (
          ""
        )}
        <div className={classes.tabButtons}>
          {uniqueTags.map((tag, index) => {
            return (
              <button
                key={index + 1}
                onClick={() => setActiveTab(`tab${index}`)}
                className={activeTab === `tab${index}` ? classes.active : ""}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className={classes.tabContent}>
          {uniqueTags.map((tag, index) => {
            return (
              activeTab === `tab${index}` && (
                <div key={index + 1}>
                  <ul className={classes.treatmentList}>
                    {tabsTreatments
                      .filter((tabTreatment) => tabTreatment.tags.includes(tag))
                      .reverse()
                      .map((treatment, index) => {
                        return (
                          <li
                            key={index}
                            className={
                              openIndex === index
                                ? classes.isOpen
                                : classes.isClosed
                            }
                          >
                            <h3
                              className={classes.treatmentTitle}
                              onClick={() => toggleAccordion(index)}
                            >
                              {treatment.title}
                              <span className={classes.arrowHolder}>
                                <FaAngleDown className={classes.arrow} />
                              </span>
                            </h3>
                            <div
                              className={classes.contentHoder}
                              dangerouslySetInnerHTML={{
                                __html: treatment.content,
                              }}
                            />
                          </li>
                        );
                      })}
                  </ul>
                </div>
              )
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export async function getServerSidePaths() {
  try {
    const { data } = await client.query({
      query: GET_ALL_PAGES_SLUGS,
    });

    const paths = data.pages.nodes.map((page) => ({
      params: { slug: page.slug },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return { paths: [], fallback: false };
  }
}

export async function getServerSideProps({ params }) {
  try {
    const [pageData, treatmentsData, tagsData] = await Promise.all([
      client.query({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: params.slug },
      }),
      client.query({
        query: GET_TREATMENTS,
      }),
      client.query({
        query: GET_TAGS,
      }),
    ]);

    return {
      props: {
        page: pageData.data.pageBy,
        treatments: treatmentsData.data,
        tags: tagsData.data.tags.nodes,
      },
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      props: {
        page: null,
        treatments: null,
      },
    };
  }
}

export default Page;
