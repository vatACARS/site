import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import { MultiPolygon, Point } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import { Fill, Stroke, Icon, Text } from 'ol/style';
import Select from 'ol/interaction/Select';

import FirBoundaries from '../../../public/data/firboundaries.json';

export default function MapComponent({ setSelectedFeature }) {
    const mapRef = useRef(null);

    async function generateMap() {
        const response = await fetch("/api/misc/getStats", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(resp => resp.json());

        const processedData = response.map(item => {
            // Parse the nested JSON strings
            item.sectors = JSON.parse(item.sectors);
            item.approxLoc = JSON.parse(item.approxLoc);

            // Format the date
            item.opened = new Date(item.opened).toLocaleTimeString();

            return item;
        });

        let features = [];
        let polyFeatures = [];
        for (let atsu of processedData) {
            const { latitude, longitude } = atsu.approxLoc;
            let feature = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
                label: atsu.name,
                details: atsu,
            });

            feature.setStyle(new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.15,
                    src: '/img/satellite-dish-solid.png',
                }),
                text: new Text({
                    text: atsu.station_code,
                    offsetY: -30,
                    fill: new Fill({
                        color: '#fff'
                    }),
                    stroke: new Stroke({
                        color: '#000',
                        width: 2
                    })
                })
            }));

            features.push(feature);

            for(let sector of atsu.sectors) {
                let fir = FirBoundaries.features.find(f => f.properties.id === sector.name);
                if(fir) {
                    let geometry = new GeoJSON().readGeometry(fir.geometry) as MultiPolygon;
                    geometry.transform('EPSG:4326', 'EPSG:3857');
                    let polyFeature = new Feature({
                        geometry,
                        label: sector.callsign,
                        details: atsu,
                    });

                    polyFeature.setStyle(new Style({
                        fill: new Fill({
                            color: 'rgba(59, 130, 246, 0.1)',
                        }),
                        stroke: new Stroke({
                            color: 'rgba(59, 130, 246, 0.5)',
                            width: 1,
                        }),
                        text: new Text({
                            text: sector.callsign,
                            offsetY: 0,
                            fill: new Fill({
                                color: '#fff'
                            }),
                            stroke: new Stroke({
                                color: '#000',
                                width: 2
                            })
                        })
                    }));

                    polyFeatures.push(polyFeature);
                } 
            }
        }

        console.log(polyFeatures)

        const vectorLayer = new VectorLayer({
            source: new VectorSource({ features }),
        });

        const polygonLayer = new VectorLayer({
            source: new VectorSource({ features: polyFeatures }),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                        attributions: '© <a href="https://cartodb.com/attribution">CartoDB</a>',
                    }),
                }),
                polygonLayer,
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
        });

        const select = new Select();
        map.addInteraction(select);

        select.on('select', function (e) {
            if (e.selected.length > 0) {
                const feature = e.selected[0];
                const geometry = feature.getGeometry();

                if (geometry instanceof Point) {
                    const coordinates = geometry.getCoordinates();
                    map.getView().animate({
                        center: coordinates,
                        zoom: 5,
                        duration: 1000,
                    });
                    setSelectedFeature(feature);
                }

                if (geometry instanceof MultiPolygon) {
                    
                    setSelectedFeature(feature);
                }
            }
        });

        return map;
    }

    useEffect(() => {
        let map;
        generateMap().then(createdMap => {
            map = createdMap;
        });

        return () => map && map.setTarget(null);
    }, []);

    return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}