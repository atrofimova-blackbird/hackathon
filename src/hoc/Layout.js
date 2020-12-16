import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart/MapChart";
import ResultCard from "../components/ResultCard/ResultCard";

function Layout() {
  const [content, setContent] = useState("");
  return (
    <div className="Layout">
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <ResultCard />
    </div>
  );
}

export default Layout;
