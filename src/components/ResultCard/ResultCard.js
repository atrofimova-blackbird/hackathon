import React from "react";
import './ResultCard.css';

const ResultCard = (props) => {
  return (
    <div className="ResultCard">
      <div className="header">
        <h2>Beacons analytics</h2>
        {/*<p>State: <span>{props.beacons.state_or_province_name || "Not selcted"}</span></p>*/}
        {/*<p>FSA: 70578</p>*/}
      </div>
      <div className="beacons-data">
        <p>item_views: <span>{props.beacons.item_views || 0}</span></p>
        <p>clicks: <span>{props.beacons.clicks || 0}</span></p>
        <p>clippings: <span>{props.beacons.clippings || 0}</span></p>
        <p>add_to_cart: <span>{props.beacons.add_to_cart || 0}</span></p>
        <p>shares: <span>{props.beacons.shares || 0}</span></p>
        <p>ttms: <span>{props.beacons.ttms || 0}</span></p>
      </div>
      <div className="beacons-data">
        <p>Zip/Postal Codes:</p>
        <div>
          {props.beacons.zipsForMarker ? props.beacons.zipsForMarker.join(", ") : null}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

  // merchant_name
  // flyer_run_name
  // flyer_description
  //
  // // flyer_run_id
  // // flyer_id
  //
  // // postal_code
  // // latitude
  // // longitude
  // // fsa
  // // state_or_province
  // // country
  //
  // date
  // state_or_province_name
  // city
  //
  // item_views
  // clicks
  // clippings
  // add_to_cart
  // shares
  // ttms





