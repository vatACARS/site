import React, { useEffect, useRef, useState } from 'react';

import 'ol/ol.css';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';

const fetcher = (url) => fetch(url, {headers: { "Content-Type": "application/json" }}).then((res) => res.json());

import FirBoundaries from '@public/data/firboundaries.json';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export default ({ className }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [firBoundaries, setFirBoundaries] = useState(null);

    useEffect(() => {
        if(!map) {
            initializeMap();
        } else {
            updateMap();
        }
    }, []);

    const initializeMap = () => {
        const boundariesLayer = new VectorLayer({ source: new VectorSource() });
        
        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
                    })
                }),
                boundariesLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2
            }),
            controls: defaultControls({
                zoom: false,
            }),
        });

        const firFeatures = [];

        for(const feature of FirBoundaries.features) {
            const geometry = new GeoJSON().readGeometry(feature.geometry);
            geometry.transform('EPSG:4326', 'EPSG:3857');
            const polyFeature = new Feature({
                geometry,
                name: feature.properties.id
            });

            polyFeature.setStyle(new Style({
                fill: new Fill({
                    color: 'rgba(0, 0, 0, 0.1)'
                }),
                stroke: new Stroke({
                    color: 'rgba(255, 255, 255, 0.1)',
                    width: 1
                })
            }));

            firFeatures.push(polyFeature);
        }

        boundariesLayer.getSource().addFeatures(firFeatures);

        setMap(initialMap);
        setFirBoundaries(boundariesLayer);
    }

    const updateMap = () => {
        map.setTarget(mapRef.current);
    }

    return <div ref={mapRef} className={className} />;
}