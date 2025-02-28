import logo from "../public/Logo.svg";
import Image from "next/image";
import classes from "./Header.module.scss";
import NavMenu from "./NavMenu";
import Link from "next/link";

function Header(url) {
  return (
    <header className={classes.header}>
      <div>
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>
      <NavMenu />
    </header>
  );
}

export default Header;
