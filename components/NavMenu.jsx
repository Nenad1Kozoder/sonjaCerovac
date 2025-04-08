import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mobMenuImg from "../public/mobileMenu.svg";
import mobMenuX from "../public/x.svg";
import classes from "./NavMenu.module.scss";

const isActiveItem = (item, currentPath, menuItems) => {
  const isExactMatch = currentPath === item.path;
  const isDescendant = currentPath.startsWith(item.path + "/");

  const hasExplicitChildMatch = menuItems.some(
    (child) =>
      child.path !== item.path &&
      child.path.startsWith(item.path + "/") &&
      child.path === currentPath
  );

  return isExactMatch || (isDescendant && !hasExplicitChildMatch);
};

const NavMenu = ({ isHeader, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <nav
      className={`${classes.navbar} ${isHeader ? classes.navbarHeader : ""}`}
    >
      <div>
        {/* Desktop meni */}
        <ul className={classes.menu}>
          {menuItems.map((item, index) => {
            const isActive = isActiveItem(item, currentPath, menuItems);

            return (
              <li key={index}>
                <Link
                  href={item.path}
                  className={isActive ? classes.active : ""}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobilni/tablet dugme */}
        <button
          className={classes.hamburger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={mobMenuImg}
            alt="mobile menu switch on"
          />
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
            onClick={() => setIsOpen(false)}
          >
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={mobMenuX}
              alt="mobile menu switch off"
            />
          </button>
          <ul>
            {menuItems.map((item, index) => {
              const isActive = isActiveItem(item, currentPath, menuItems);

              return (
                <li key={index}>
                  <Link
                    href={item.path}
                    className={isActive ? classes.active : ""}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
