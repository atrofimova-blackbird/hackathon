import React from "react";
import './MapChart.css';
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation
} from "react-simple-maps";

import allStates from "../../data/allstates";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
};

const MapChart = (props) => {
  return (
    <ComposableMap className="MapChart" data-tip="" projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => {
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  stroke="#FFF"
                  geography={geo}
                  onMouseEnter={() => {
                    // const NAME = geo.properties.name;
                    const { clicks, opens } = cur;
                    props.setTooltipContent(`Reduced analytics: ${clicks} clicks, ${opens} opens`);
                  }}
                  onMouseLeave={() => {
                    props.setTooltipContent("");
                  }}
                  onClick={() => {
                    props.setBeaconsContent({
                      id: cur.id,
                      name: geo.properties.name,
                      opens: cur.opens,
                      engaged_visits: cur.engaged_visits,
                      page_views: cur.page_views,
                      clicks: cur.clicks,
                      ttm: cur.ttm
                    });
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                      transition: "all .2s ease"
                    },
                    hover: {
                      fill: "#00C6D7",
                      outline: "none",
                      cursor: "pointer",
                      transition: "all .2s ease"
                    },
                    pressed: {
                      fill: "#059cbb",
                      outline: "none"
                    }
                  }}
                  // fill="#DDD"
                />
              )
            })}
            {geographies.map(geo => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find(s => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                  centroid[0] > -160 &&
                  centroid[0] < -67 &&
                  (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={14} textAnchor="middle">
                        {cur.id}
                      </text>
                    </Marker>
                  ) : (
                    <Annotation
                      subject={centroid}
                      dx={offsets[cur.id][0]}
                      dy={offsets[cur.id][1]}
                    >
                      <text x={4} fontSize={14} alignmentBaseline="middle">
                        {cur.id}
                      </text>
                    </Annotation>
                  ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
