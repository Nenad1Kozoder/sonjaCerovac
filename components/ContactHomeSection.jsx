import Image from "next/image";
import Button from "./Button";
import dynamic from "next/dynamic";
import classes from "./ContactHomeSection.module.scss";
import { Fragment } from "react";

const MapComponent = dynamic(() => import("./MapComponent"), { ssr: false });

function ContactHomeSection({ data }) {
  const { titleContact, phone, addresse, buttonContact, hospitalLogo } = data;

  return (
    <Fragment>
      <MapComponent data={data} />
      <div>
        <h2 className={classes.title}>{titleContact}</h2>
        <Image
          src={hospitalLogo.node.sourceUrl}
          width="216"
          height="126"
          alt="logo"
        />
        <p className={classes.addresse}>{addresse}</p>
        <p className={classes.phone}>
          Call us at <a href={`"tel:"${phone}`}>{phone}</a>
        </p>
        <Button button={buttonContact} variant="blue" isExternal={true} />
      </div>
    </Fragment>
  );
}

export default ContactHomeSection;
