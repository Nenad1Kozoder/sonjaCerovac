import Image from "next/image";
import logo from "../public/logo-small.svg";
import NavMenu from "./NavMenu";
import classes from "./Footer.module.scss";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Procedures", path: "/procedures" },
  { label: "What To Expect", path: "/procedures/what-to-expect" },
];

function Footer() {
  return (
    <footer className={classes.footer}>
      <Image src={logo} width={0} height={0} sizes="100vw" alt="logo" />
      <NavMenu menuItems={menuItems} />
    </footer>
  );
}

export default Footer;
