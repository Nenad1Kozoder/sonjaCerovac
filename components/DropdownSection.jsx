import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";
import Title from "./Title";
import classes from "./DropdownSection.module.scss";
import { Fragment } from "react";

function DropdownSection({ title, expertises }) {
  return (
    <Fragment>
      <Title as="h2" className="greenRegular">
        {title}
      </Title>
      <ul className={classes.expertiseList}>
        {expertises.map((expertise, index) => (
          <li key={index} className={classes.expertiseListItem}>
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
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

export default DropdownSection;
