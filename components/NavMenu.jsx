import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mobMenuImg from "../public/mobileMenu.svg";
import mobMenuX from "../public/x.svg";
import classes from "./NavMenu.module.scss"; // Uvozi SCSS

const NavMenu = ({ isHeader, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className={`${classes.navbar} ${isHeader ? classes.navbarHeader : ""}`}
    >
      <div>
        {/* Desktop meni */}
        <ul className={classes.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={router.pathname === item.path ? classes.active : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobilni/tablet dugme */}
        <button
          className={classes.hamburger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image width={0} height={0} sizes="100vw" src={mobMenuImg} />
        </button>
      </div>

      {/* Mobilni meni */}
      {isHeader && (
        <div
          className={`${classes.mobileMenu} ${
            isOpen ? classes.mobileMenuActive : ""
          }`}
        >
          <button
            className={classes.hamburger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image width={0} height={0} sizes="100vw" src={mobMenuX} />
          </button>
          <ul>
            {menuItems.map((item, index) => (
              <li>
                <Link
                  key={index}
                  href={item.path}
                  className={router.pathname === item.path ? "active" : ""}
                  onClick={() => setIsOpen(false)} // Zatvori meni na klik
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
