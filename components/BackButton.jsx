import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import arrow from "../public/arrowWhite.svg";
import Image from "next/image";
import classes from "./BackButton.module.scss";

const BackButton = () => {
  const router = useRouter();
  const [backUrl, setBackUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");

  useEffect(() => {
    const currentPath = router.asPath;
    const titlePart = currentPath
      .replace(/\/([^/]+)$/, "")
      .split("/")
      .pop();
    const formattedTitle = titlePart ? titlePart.replace(/-/g, " ") : "";
    const newPath = currentPath.replace(/\/([^/]+)$/, "");

    setBackUrl(newPath);
    setLinkTitle(`Back to ${formattedTitle}`);
  }, [router.asPath]);

  return (
    <Link className={classes.link} href={backUrl}>
      <Image width={17} height={21} src={arrow} alt="arrow" />
      {linkTitle}
    </Link>
  );
};

export default BackButton;
