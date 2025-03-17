import logo from "../public/Logo.svg";
import Image from "next/image";
import classes from "./Header.module.scss";
import NavMenu from "./NavMenu";
import Link from "next/link";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Procedures", path: "/procedures" },
  { label: "What To Expect", path: "/procedures/what-to-expect" },
  { label: "Contact Me", path: "/contact-me" },
];

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.linkHolder}>
        <Link href="/">
          <Image width={0} height={0} sizes="100vw" src={logo} alt="logo" />
        </Link>
      </div>
      <NavMenu menuItems={menuItems} isHeader={true} />
    </header>
  );
}

export default Header;
