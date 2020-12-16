import React, { useState, useEffect } from "react";
import './MapChart.css';
import { geoCentroid } from "d3-geo";
import { scaleQuantile } from "d3-scale";
import { csv } from "d3-fetch";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup
} from "react-simple-maps";

import allStates from "../../data/allstates";

const geoUrlStates = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const geoUrlCounties = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

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
  const [data, setData] = useState([]);

  useEffect(() => {
    csv("/clicks.csv").then(counties => {
      setData(counties);
    });
  }, []);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.clicks))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  return (
    <ComposableMap className="MapChart" data-tip="" projection="geoAlbersUsa">
      <ZoomableGroup zoom={1}>

      <Geographies geography={geoUrlCounties}>
        {({ geographies }) =>
          geographies.map(geo => {
            const cur = data.find(s => s.id === geo.id);
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(cur.clicks) : "#EEE"}
              />
            );
          })
        }
      </Geographies>

      <Geographies geography={geoUrlStates}>
        {({ geographies }) =>  {
          // console.log("geographies", geographies);
          return (
            <>
              {geographies.map(geo => {
                const cur = allStates.find(s => s.val === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    onMouseEnter={() => {
                      const name = geo.properties.name;
                      const { clicks, opens } = cur;
                      props.setTooltipContent(`${name}: ${clicks} clicks, ${opens} opens`);
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
                        fill: "transparent",
                        outline: "none",
                        transition: "all .2s ease"
                      },
                      hover: {
                        fill: "rgba(255, 255, 255, .6)",
                        outline: "none",
                        cursor: "pointer",
                        transition: "all .2s ease"
                      },
                      pressed: {
                        fill: "rgba(255, 225, 225, .8)",
                        outline: "none"
                      }
                    }}
                    // fill="#DDD"
                  />
                )
              })}
              {/*{geographies.map(geo => {*/}
              {/*const centroid = geoCentroid(geo);*/}
              {/*const cur = allStates.find(s => s.val === geo.id);*/}
              {/*return (*/}
              {/*<g key={geo.rsmKey + "-name"}>*/}
              {/*{cur &&*/}
              {/*centroid[0] > -160 &&*/}
              {/*centroid[0] < -67 &&*/}
              {/*(Object.keys(offsets).indexOf(cur.id) === -1 ? (*/}
              {/*<Marker coordinates={centroid}>*/}
              {/*<text y="2" fontSize={14} textAnchor="middle">*/}
              {/*{cur.id}*/}
              {/*</text>*/}
              {/*</Marker>*/}
              {/*) : (*/}
              {/*<Annotation*/}
              {/*subject={centroid}*/}
              {/*dx={offsets[cur.id][0]}*/}
              {/*dy={offsets[cur.id][1]}*/}
              {/*>*/}
              {/*<text x={4} fontSize={14} alignmentBaseline="middle">*/}
              {/*{cur.id}*/}
              {/*</text>*/}
              {/*</Annotation>*/}
              {/*))}*/}
              {/*</g>*/}
              {/*);*/}
              {/*})}*/}
            </>
          )
        }}
      </Geographies>

      </ZoomableGroup>
    </ComposableMap>
  );
};

export default MapChart;
