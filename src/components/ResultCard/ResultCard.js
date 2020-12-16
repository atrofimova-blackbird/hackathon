import React from "react";
import './ResultCard.css';

const ResultCard = (props) => {
  return (
    <div className="ResultCard">
      <div className="header">
        <h2>Full analytics</h2>
        <p>State: <span>{props.beacons.name || "Default"} ({props.beacons.id || "Default"})</span></p>
        <p>FSA: 70578</p>
      </div>
      <div className="beacons-data">
        <p>opens: <span>{props.beacons.opens || 0}</span></p>
        <p>engaged_visits: <span>{props.beacons.engaged_visits || 0}</span></p>
        <p>page_views: <span>{props.beacons.page_views || 0}</span></p>
        <p>clicks: <span>{props.beacons.clicks || 0}</span></p>
        <p>ttm: <span>{props.beacons.ttm || 0}</span></p>
      </div>
    </div>
  );
};

export default ResultCard;
