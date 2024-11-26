import { FunctionComponent } from "react";
import styles from "./HotelsPage.module.css";

export type HotelsPageType = {
  className?: string;
};

const HotelsPage: FunctionComponent<HotelsPageType> = ({ className = "" }) => {
  return <div className={[styles.hotelsPage, className].join(" ")} />;
};

export default HotelsPage;
