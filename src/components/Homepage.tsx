import { FunctionComponent } from "react";
import styles from "./Homepage.module.css";

export type HomepageType = {
  className?: string;
};

const Homepage: FunctionComponent<HomepageType> = ({ className = "" }) => {
  return <div className={[styles.homepage, className].join(" ")} />;
};

export default Homepage;
