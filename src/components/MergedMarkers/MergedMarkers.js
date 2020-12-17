import React from "react";
import { Marker } from "react-simple-maps";

import TXZipCodes from "../../data/tx-zip-code-latitude-and-longitude";
// import TXZipCodes from "../../data/test";

const MARKER_DECIMAL = 0;

let originalMarkers = TXZipCodes.map(entry => entry.fields);
let mergedMarkers = {};

originalMarkers.map(entry => {
  let coordBasedKey = `${entry.longitude.toFixed(MARKER_DECIMAL)}:${entry.latitude.toFixed(MARKER_DECIMAL)}`;

  let zipData = {};
  zipData[entry.zip] = {...entry};

  if (mergedMarkers.hasOwnProperty(coordBasedKey)) {
    mergedMarkers[coordBasedKey][entry.zip] = {...entry};
  } else {
    mergedMarkers[coordBasedKey] = zipData;
  }
});

console.log("mergedMarkers", mergedMarkers);

let mergedMarkersArr = [];

for (const [key, value] of Object.entries(mergedMarkers)) {
  let tmp = {};
  tmp[key] = value;
  mergedMarkersArr.push(tmp);
}

const MergedMarkers = (props) => {
  let UIMarkers = [];

  mergedMarkersArr.map((marker) => {

    let coordBasedKey = Object.keys(marker)[0];
    let [lon, lat] = coordBasedKey.split(':');

    UIMarkers.push(
      <Marker key={`${lon}-${lat}`} coordinates={[lon, lat]}
              onMouseEnter={() => props.setTooltipContent(`${lon}-${lat}`)}
              onMouseLeave={() => props.setTooltipContent("")}
              onClick={()=>{console.log('click')}}
              style={{
                default: {
                  fill: "rgba(0,0,0, 0)",
                  transition: "all .2s ease"
                },
                hover: {
                  fill: "rgba(0,0,0, .4)",
                  transition: "all .2s ease"
                }
              }}
      >

        <g transform="translate(-41, -41)"
           strokeLinecap="round"
           strokeLinejoin="round">
          <path d="M 33 33 H 50 V 50 H 33 L 33 33"/>
        </g>

        {/*<circle r={2} fill="#F00" />*/}
      </Marker>
    );
  })

  return UIMarkers;
};

export default MergedMarkers;
