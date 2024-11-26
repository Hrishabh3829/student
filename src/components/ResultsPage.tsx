import { FunctionComponent } from "react";
import styles from "./ResultsPage.module.css";

export type ResultsPageType = {
  className?: string;
};

const ResultsPage: FunctionComponent<ResultsPageType> = ({
  className = "",
}) => {
  return <div className={[styles.resultsPage, className].join(" ")} />;
};

export default ResultsPage;
