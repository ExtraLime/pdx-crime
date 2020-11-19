import React, { useState, useEffect } from 'react';
import Choropleth from 'react-leaflet-choropleth';
import hash from 'object-hash';
import { Map, TileLayer } from 'react-leaflet';


function getColor(c,maxCount) {
  let cV = c/maxCount;
  return cV > .9 ? '#681740' :
         cV > .75  ? '#a8234c' :
         cV > .5  ? '#e3534c' :
         cV > .3  ? '#fa7c5a' :
         cV > .2   ? '#ffa874' :
         cV > .1   ? '#ffd08e' :
         cV >= .05  ?  '#95c22b':
                    '#FFFFFF';
}

function style(feature,maxCount) {
  return {
      fillColor: getColor(parseInt(feature.properties.count),maxCount),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });
  layer.bindPopup(`${layer.feature.properties.MAPLABEL} ${layer.feature.properties.count}`)
}

function resetHighlight(e) {
  var layer = e.target;

  layer.setStyle({
      weight: 0,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
  });

}

function popupToFeature(e) {
  e.target.bindPopup(`${e.target.feature.properties.MAPLABEL} ${e.target.feature.properties.count}`);
}

const getIdentity = (feature) => {
  return hash(feature);   // generates unique hash from the feature object using object-hash library
}

function onEachFeature(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: popupToFeature,
  });
}

const ChoroplethMap = (props) => {
  const [mapData, setMapData] = useState(props);
  

  useEffect(() => {
    if (mapData.geojson !== props) {
      setMapData(props);
    }
  }, [mapData, props]);
  
const maxCount = Math.max(...mapData.geojson.features.map(hood => parseInt(hood.properties.count)));
  
  return (
    <>
      <div className="choropleth-container">
        <Map center={[45.523064,-122.676483]} zoom={11}>
          <TileLayer
            url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
          <Choropleth
            identity={(feature) => getIdentity(feature)}
            data={mapData.geojson}
            valueProperty={feature => feature.properties.count }
            visible={''}
            scale={['#b3cde0', '#011f4b']}
            steps={7}
            mode='e'
            style={(feature) => style(feature,maxCount)}
            onEachFeature={(feature, layer) => onEachFeature(feature, layer)}
          />
        </Map>
      </div>
    </>
    )
  }

export default ChoroplethMap;
