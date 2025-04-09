import { Fragment, useState, useRef } from "react";
import TreatmentSlider from "@/components/TreatmentSlider";
import { FaAngleDown } from "react-icons/fa6";

import classes from "./Treatments.module.scss";

function Treatments({ treatments, slug, tags, colorClass }) {
  const [activeTab, setActiveTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const targetRef = useRef(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function handleTab(activeTab) {
    setActiveTab(activeTab);
    setOpenIndex(0);

    if (targetRef.current) {
      const elementPosition =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 40, behavior: "smooth" });
    }
  }

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
  const pageTreatments = filterByCategorySlug(slug);

  const uniqueCategories =
    pageTreatments.length > 0 && pageTreatments[0].category
      ? [...new Set(pageTreatments.map((treatment) => treatment.category))]
      : [];

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
    setOpenIndex(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === uniqueCategories.length - 1 ? 0 : prevIndex + 1
    );
    setOpenIndex(0);
  };

  const tagNames = tags.map((tag) => tag.name);

  uniqueTags.sort((a, b) => tagNames.indexOf(a) - tagNames.indexOf(b));

  const prevTag = () => {
    setActiveTab((prevIndex) =>
      prevIndex === 0 ? uniqueTags.length - 1 : prevIndex - 1
    );
    setOpenIndex(0);
  };

  const nextTag = () => {
    setActiveTab((prevIndex) =>
      prevIndex === uniqueTags.length - 1 ? 0 : prevIndex + 1
    );
    setOpenIndex(0);
  };

  const uniqueCategoriesExist = uniqueCategories.length;
  return (
    <div
      ref={targetRef}
      className={`${classes.contentWraper} ${classes[colorClass]}`}
    >
      {uniqueCategoriesExist ? (
        <Fragment>
          <div className={classes.filterSubcategories}>
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
      <div
        className={`${classes.filterTags} ${
          !uniqueCategoriesExist && classes.filterTagsCenter
        }`}
      >
        <TreatmentSlider
          currentIndex={activeTab}
          nextSlide={nextTag}
          prevSlide={prevTag}
          treatments={uniqueTags}
          isGreenBg={true}
        />
      </div>
      <div className={classes.tabButtons}>
        {uniqueTags.map((tag, index) => {
          return (
            <button
              key={index + 1}
              onClick={() => handleTab(index)}
              className={activeTab === index ? classes.active : ""}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <div className={classes.tabContent}>
        {uniqueTags.map((tag, index) => {
          const filteredTabTreatmens = tabsTreatments
            .filter((tabTreatment) => tabTreatment.tags.includes(tag))
            .reverse();

          return (
            activeTab === index && (
              <div key={index + 1} className={classes.activeTreatmentHolder}>
                <ul className={classes.treatmentList}>
                  {filteredTabTreatmens.map((treatment, index) => {
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
                          onClick={() =>
                            filteredTabTreatmens.length > 1 &&
                            toggleAccordion(index)
                          }
                        >
                          <span className={classes.titleHolder}>
                            {treatment.title}
                          </span>
                          {filteredTabTreatmens.length > 1 ? (
                            <span className={classes.arrowHolder}>
                              <FaAngleDown className={classes.arrow} />
                            </span>
                          ) : (
                            ""
                          )}
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

export default Treatments;
