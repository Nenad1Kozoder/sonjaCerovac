import Image from "next/image";
import logo from "../public/logo-small.svg";
import classes from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={classes.footer}>
      <Image src={logo} alt="logo" />
    </footer>
  );
}

export default Footer;
