import React from "react";
import './ResultCard.css';

const ResultCard = () => {
  return (
    <div className="ResultCard">
      <div className="header">
        <h2>Full analytics</h2>
        <p>State: Texas (TX)</p>
        <p>FSA: 70578</p>
      </div>
      <div className="beacons-data">
        <p>opens: 3</p>
        <p>engaged_visits: 3</p>
        <p>page_views: 3</p>
        <p>clicks: 3</p>
        <p>ttm: 3</p>
      </div>
    </div>
  );
};

export default ResultCard;
