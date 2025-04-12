import { Fragment, useState, useRef, useEffect } from "react";
import { useQuery } from "@apollo/client";
import TreatmentSlider from "@/components/TreatmentSlider";
import { FaAngleDown } from "react-icons/fa6";
import { GET_CATEGORIES_BY_PARENT_ID } from "@/queries/getCategories";
import { GET_TREATMENTS_BY_CATEGORY } from "@/queries/getTreatments";
import Loader from "@/components/Loader";

import classes from "./Treatments.module.scss";

function Treatments({ tags, colorClass, categoryID, slug }) {
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORIES_BY_PARENT_ID, {
    variables: { id: categoryID },
  });

  const rawCategories = categoryData?.category?.children?.nodes || [];
  const categories = rawCategories.length
    ? [...rawCategories].reverse()
    : [{ name: slug }];

  const [activeCategoryName, setActiveCategoryName] = useState("");
  const [uniqueTags, setUniqueTags] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  const targetRef = useRef(null);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategoryName(categories[0].name);
    }
    if (categories.length > 0) {
      setActiveCategoryName(categories[0].name);
    }
  }, [categories]);

  const { data: treatmentsData, loading: treatmentsLoading } = useQuery(
    GET_TREATMENTS_BY_CATEGORY,
    {
      variables: { category: activeCategoryName },
    }
  );

  const treatments = treatmentsData?.treatments?.nodes || [];

  useEffect(() => {
    if (treatments.length > 0) {
      const pageTags = [
        ...new Set(
          treatments.flatMap((treatment) =>
            treatment.tags.nodes.map((tag) => tag.name)
          )
        ),
      ];

      const result = tags
        .map((tag) => tag.name)
        .filter((name) => pageTags.includes(name));

      setUniqueTags(result);
    }
  }, [treatments, tags]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleTab = (index) => {
    setActiveTab(index);
    setOpenIndex(0);

    if (targetRef.current) {
      const elementPosition =
        targetRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 40, behavior: "smooth" });
    }
  };

  const prevSlide = () => {
    setOpenIndex(0);
    setActiveTab(0);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === 0 ? categories.length - 1 : prevIndex - 1;
      setActiveCategoryName(categories[nextIndex].name);
      return nextIndex;
    });
  };

  const nextSlide = () => {
    setOpenIndex(0);
    setActiveTab(0);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex === categories.length - 1 ? 0 : prevIndex + 1;
      setActiveCategoryName(categories[nextIndex].name);
      return nextIndex;
    });
  };

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

  const uniqueCategoriesExist = categories.length > 0;

  if (categoryLoading) {
    return (
      <div className={`${classes.contentWraper} ${classes["noColumns"]}`}>
        <Loader colorClass={colorClass} />
      </div>
    );
  }

  return (
    <div
      ref={targetRef}
      className={`${classes.contentWraper} ${classes[colorClass]}`}
    >
      {uniqueCategoriesExist && (
        <Fragment>
          <div className={classes.filterSubcategories}>
            <TreatmentSlider
              currentIndex={currentIndex}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
              categories={categories}
            />
          </div>

          <h2 className={classes.title}>Treatment Types</h2>
        </Fragment>
      )}

      <div
        className={`${classes.filterTags} ${
          !uniqueCategoriesExist && classes.filterTagsCenter
        }`}
      >
        {treatmentsLoading ? (
          <Loader colorClass={colorClass} />
        ) : (
          <TreatmentSlider
            currentIndex={activeTab}
            nextSlide={nextTag}
            prevSlide={prevTag}
            categories={uniqueTags}
            isGreenBg={true}
          />
        )}
      </div>

      <div className={classes.tabButtons}>
        {treatmentsLoading ? (
          <Loader colorClass={colorClass} />
        ) : (
          uniqueTags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTab(index)}
              className={activeTab === index ? classes.active : ""}
            >
              {tag}
            </button>
          ))
        )}
      </div>

      {treatmentsLoading ? (
        <Loader colorClass={colorClass} />
      ) : (
        <div className={classes.tabContent}>
          {uniqueTags.map((tag, index) => {
            const filteredTabTreatmens = treatments
              .filter((tabTreatment) =>
                tabTreatment.tags.nodes.some((node) => node.name === tag)
              )
              .reverse();

            return (
              activeTab === index && (
                <div key={index} className={classes.activeTreatmentHolder}>
                  <ul className={classes.treatmentList}>
                    {filteredTabTreatmens.map((treatment, i) => (
                      <li
                        key={i}
                        className={
                          openIndex === i ? classes.isOpen : classes.isClosed
                        }
                      >
                        <h3
                          className={classes.treatmentTitle}
                          onClick={() =>
                            filteredTabTreatmens.length > 1 &&
                            toggleAccordion(i)
                          }
                        >
                          <span className={classes.titleHolder}>
                            {treatment.title}
                          </span>
                          {filteredTabTreatmens.length > 1 && (
                            <span className={classes.arrowHolder}>
                              <FaAngleDown className={classes.arrow} />
                            </span>
                          )}
                        </h3>
                        <div
                          className={classes.contentHoder}
                          dangerouslySetInnerHTML={{
                            __html: treatment.content,
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Treatments;
