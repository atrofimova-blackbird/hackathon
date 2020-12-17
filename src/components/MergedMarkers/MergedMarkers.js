import React, { useState } from "react";
import { Marker } from "react-simple-maps";

import beaconsData from "../../data/beaconsData";
import TXZipCodes from "../../data/tx-zip-code-latitude-and-longitude";


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

let mergedMarkersArr = [];

for (const [key, value] of Object.entries(mergedMarkers)) {
  let tmp = {};
  tmp[key] = value;
  mergedMarkersArr.push(tmp);
}


// MAP ZIP WITH BEACONS

class BeaconCollection extends Array {
  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }
}

let getBeacons = () => beaconsData.map((beacon)=>{
  return beacon;
});

let getBeaconsObjectForZips = zips => getBeacons().filter(beacon=>{
  return zips.includes(beacon.postal_code);
});


let getSumBeaconsForSquare = beaconsForZips => {
  let beac = new BeaconCollection(...beaconsForZips);

  return {
    item_views: beac.sum('item_views'),
    clicks: beac.sum('clicks'),
    clippings: beac.sum('clippings'),
    add_to_cart: beac.sum('add_to_cart'),
    shares: beac.sum('shares'),
    ttms: beac.sum('ttms')
  };
}

const MergedMarkers = (props) => {
  let UIMarkers = [];

  const [currentTarget, setCurrentTarget] = useState(null);

  mergedMarkersArr.map((marker) => {
    let coordBasedKey = Object.keys(marker)[0];
    let zipsForMarker = Object.keys(marker[coordBasedKey]);
    let [lon, lat] = coordBasedKey.split(':');

    let beaconsForZips = getBeaconsObjectForZips(zipsForMarker);
    let beaconsForSquare = getSumBeaconsForSquare(beaconsForZips);

    // console.log(beaconsForZips);

    let onlyUnique = (value, index, self) => self.indexOf(value) === index;
    let merchantsForSquare = beaconsForZips.map(b => b.merchant_name).filter(onlyUnique);
    let citiesForSquare = beaconsForZips.map(b => b.city).filter(onlyUnique);

    UIMarkers.push(
      <Marker key={`${lon}-${lat}`} coordinates={[lon, lat]}
              // onMouseEnter={() => props.setTooltipContent(`${zipsForMarker.join(', ')}`)}
              onMouseEnter={() => props.setTooltipContent(merchantsForSquare.join(", "))}
              onMouseLeave={() => props.setTooltipContent("")}
              onClick={(e) => {
                props.setBeaconsContent({
                  zipsForMarker: zipsForMarker,
                  ...beaconsForSquare
                });
                const target = e.currentTarget;
                setCurrentTarget(target);
                target.classList.add('selected');
                if (currentTarget !== target && currentTarget) {
                  currentTarget.classList.remove('selected');
                } 
              }}
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
