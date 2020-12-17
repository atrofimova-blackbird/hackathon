import React from "react";
import { Marker } from "react-simple-maps";

import TXZipCodes from "../../data/tx-zip-code-latitude-and-longitude";
// import TXZipCodes from "../../data/test";

const MARKER_DECIMAL = 1;

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
                    onMouseEnter={props.setTooltipContent(`${lon}-${lat}`)}
                    onMouseLeave={props.setTooltipContent("")}
                    onClick={()=>{console.log('click')}}>
        <circle r={2} fill="#F00" />
      </Marker>
    );
  })

  return UIMarkers;
};

export default MergedMarkers;
