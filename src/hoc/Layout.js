import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import MapChart from "../components/MapChart/MapChart";
import ResultCard from "../components/ResultCard/ResultCard";

function Layout() {
  const [content, setContent] = useState("");
  const [beacons, setBeacons] = useState({});

  return (
    <div className="Layout">
      <MapChart setBeaconsContent={setBeacons} setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
      <ResultCard beacons={beacons} />
    </div>
  );
}

export default Layout;
