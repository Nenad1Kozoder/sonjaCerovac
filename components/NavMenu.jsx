import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./NavMenu.module.scss"; // Uvozi SCSS

const menuItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Procedures", path: "/procedures" },
  { label: "What To Expect", path: "/what-to-expect" },
  { label: "Contact Me", path: "/contact-me" },
];

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div>
        {/* Desktop meni */}
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={router.pathname === item.path ? styles.active : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobilni/tablet dugme */}
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobilni meni */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={router.pathname === item.path ? "active" : ""}
              onClick={() => setIsOpen(false)} // Zatvori meni na klik
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default NavMenu;
