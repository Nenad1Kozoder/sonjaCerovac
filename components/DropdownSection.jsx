import { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import Title from "./Title";
import classes from "./DropdownSection.module.scss";

function DropdownSection({ title, expertises }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown !== null &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (index) => {
    if (window.matchMedia("(hover: none)").matches) {
      setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  return (
    <Fragment>
      <Title as="h2" className="greenRegular">
        {title}
      </Title>
      <ul className={classes.expertiseList}>
        {expertises.map((expertise, index) => (
          <li
            key={index}
            ref={(el) => (dropdownRefs.current[index] = el)}
            className={`${classes.expertiseListItem} ${
              activeDropdown === index ? classes.expertiseListItemActive : ""
            }`}
            onClick={() => toggleDropdown(index)}
          >
            {" "}
            <div className={classes.contentHolder}>
              <h4 className={classes.itemTitle}>
                {expertise.title}
                <div className={classes.arrowHolder}>
                  <FaAngleDown className={classes.arrow} />
                </div>
              </h4>
              <div className={classes.descriptionHolder}>
                <p
                  className={classes.description}
                  dangerouslySetInnerHTML={{ __html: expertise.description }}
                />
                {expertise.button.links.map((btnLink, idx) =>
                  btnLink.uri ? (
                    <Link
                      className={classes.button}
                      key={idx}
                      href={btnLink.uri || "#"}
                    >
                      {expertise.button.label}
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default DropdownSection;
