import client from "@/lib/apolloClient";
import { GET_PAGE_BY_SLUG } from "@/queries/getPageBySlug";
import { GET_ALL_PAGES_SLUGS } from "@/queries/getAllPagesSlugs";
import { GET_TREATMENTS } from "@/queries/getTreatments";
import { useState, useEffect } from "react";
import TreatmentSlider from "@/components/TreatmentSlider";
import { FaAngleDown } from "react-icons/fa6";

import classes from "./[slug].module.scss";

function Page({ page, treatments }) {
  const [activeTab, setActiveTab] = useState("tab0");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!page) return <div>Page not found</div>;

  const { title, slug, content } = page;

  const transformedTreatments = treatments.treatments.nodes.map((treatment) => {
    const category1 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[0].node.name
        : null;
    const category2 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[1].node.name
        : null;

    const categorySlug1 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[0].node.slug
        : null;
    const categorySlug2 =
      treatment.categories.edges.length > 0
        ? treatment.categories.edges[1].node.slug
        : null;

    const tag =
      treatment.tags.edges.length > 0
        ? treatment.tags.edges[0].node.name
        : null;

    const tagSlug =
      treatment.tags.edges.length > 0
        ? treatment.tags.edges[0].node.slug
        : null;

    return {
      title: treatment.title,
      content: treatment.content,
      category1,
      category2,
      categorySlug1,
      categorySlug2,
      tag,
      tagSlug,
    };
  });

  console.log("transformedTreatments:", transformedTreatments);

  const filterByCategorySlug = (catSlug) => {
    return transformedTreatments
      .filter((treatment) =>
        [treatment.categorySlug1, treatment.categorySlug2].includes(catSlug)
      )
      .map((treatment) => {
        // Napravi kopiju objekta
        const updatedTreatment = { ...treatment };

        // Definiši koji su slugovi za obradu
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
            // Zameni category i slug sa odgovarajućim vrednostima
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

            // Očisti preostala polja
            delete updatedTreatment[category];
            delete updatedTreatment[slugField];
          }
        });

        return updatedTreatment;
      });
  };

  const pageTreatments = filterByCategorySlug(page.slug);
  const uniqueCategories = [
    ...new Set(pageTreatments.map((treatment) => treatment.category)),
  ];
  const tabsTreatments = pageTreatments.filter((trtmnnts) =>
    trtmnnts.category.includes(uniqueCategories[currentIndex])
  );
  const uniqueTags = [
    ...new Set(tabsTreatments.map((treatment) => treatment.tag)),
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

  return (
    <div className={classes.conntentHolder}>
      <div className={classes.filterTags}>
        <TreatmentSlider
          currentIndex={currentIndex}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          treatments={uniqueCategories}
        />
      </div>
      <h2 className={classes.title}>Treatment Types</h2>
      <div className={classes.tabButtons}>
        {uniqueTags.reverse().map((tag, index) => {
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
              <div>
                <ul className={classes.treatmentList}>
                  {tabsTreatments
                    .filter((tabTreatment) => tabTreatment.tag === tag)
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
  );
}

export async function getStaticPaths() {
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

export async function getStaticProps({ params }) {
  try {
    // Paralelno izvršavanje upita kako bi ubrzali dohvat podataka
    const [pageData, treatmentsData] = await Promise.all([
      client.query({
        query: GET_PAGE_BY_SLUG,
        variables: { slug: params.slug },
      }),
      client.query({
        query: GET_TREATMENTS,
      }),
    ]);

    return {
      props: {
        page: pageData.data.pageBy,
        treatments: treatmentsData.data, // Ispravljeno ime
      },
    };
  } catch (error) {
    console.error("Error fetching page data:", error);
    return {
      props: {
        page: null,
        treatments: null, // Ispravljeno ime
      },
    };
  }
}

export default Page;
