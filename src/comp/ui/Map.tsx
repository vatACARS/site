import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

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
import { defaults as defaultControls } from 'ol/control';
import { Fill, Stroke, Icon, Text } from 'ol/style';
import Select from 'ol/interaction/Select';

import FirBoundaries from '../../../public/data/firboundaries.json';

const fetcher = (url) => fetch(url, {headers: { "Content-Type": "application/json" }}).then((res) => res.json());

export default function MapComponent({ setSelectedFeature, setLiveInfo, className }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [vectorLayer, setVectorLayer] = useState(null);
    const [polygonLayer, setPolygonLayer] = useState(null);

    const { data: liveInfo, error } = useSWR('/api/misc/getStats', fetcher, { refreshInterval: 30000 });

    useEffect(() => {
        if (!map) {
            initializeMap();
        } else {
            updateMap();
        }
    }, [liveInfo]);

    const initializeMap = () => {
        const initialVectorLayer = new VectorLayer({ source: new VectorSource() });
        const initialPolygonLayer = new VectorLayer({ source: new VectorSource() });

        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                    }),
                }),
                initialPolygonLayer,
                initialVectorLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
            controls: defaultControls({
                zoom: false,
            }),
        });

        setMap(initialMap);
        setVectorLayer(initialVectorLayer);
        setPolygonLayer(initialPolygonLayer);

        const selectedStyle = (feature) =>
            new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.15,
                    src: '/img/satellite-dish-solid.png',
                }),
                text: new Text({
                    text: feature.get('name'),
                    offsetY: -30,
                    fill: new Fill({
                        color: '#aaaaff',
                    }),
                    stroke: new Stroke({
                        color: '#000',
                        width: 2,
                    }),
                }),
            });

        const pointSelect = new Select({
            condition: (evt) =>
                evt.type === 'singleclick' &&
                evt.map.getFeaturesAtPixel(evt.pixel).some((f) => f.getGeometry() instanceof Point),
            style: selectedStyle,
        });
        initialMap.addInteraction(pointSelect);

        pointSelect.on('select', function (e) {
            if (e.selected.length > 0) {
                const feature = e.selected[0];
                const geometry = feature.getGeometry();

                if (geometry instanceof Point) {
                    const coordinates = geometry.getCoordinates();
                    initialMap.getView().animate({
                        center: coordinates,
                        zoom: 5,
                        duration: 1000,
                    });
                    setSelectedFeature(feature);
                    feature.setStyle(selectedStyle(feature));
                }
            }
        });
    };

    const updateMap = () => {
        if (error || !liveInfo) return;

        setLiveInfo(liveInfo);

        const processedData = liveInfo.map((item) => {
            try {
                item.sectors = JSON.parse(item.sectors);
                item.approxLoc = JSON.parse(item.approxLoc);
                item.opened = new Date(item.opened);
            } catch (e) {}

            return item;
        });

        let features = [];
        let polyFeatures = [];
        for (let atsu of processedData) {
            const { latitude, longitude } = atsu.approxLoc;
            let feature = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
                name: atsu.station_code,
                details: atsu,
            });

            feature.setStyle(
                new Style({
                    image: new Icon({
                        anchor: [0.5, 1],
                        scale: 0.15,
                        src: '/img/satellite-dish-solid.png',
                    }),
                    text: new Text({
                        text: atsu.station_code,
                        offsetY: -30,
                        fill: new Fill({
                            color: '#fff',
                        }),
                        stroke: new Stroke({
                            color: '#000',
                            width: 2,
                        }),
                    }),
                })
            );

            features.push(feature);

            for (let sector of atsu.sectors) {
                let fir = FirBoundaries.features.find((f) => f.properties.id === `Y${sector.name}`);
                if (fir) {
                    let geometry = new GeoJSON().readGeometry(fir.geometry) as MultiPolygon;
                    geometry.transform('EPSG:4326', 'EPSG:3857');
                    let polyFeature = new Feature({
                        geometry,
                        name: sector.callsign,
                        details: atsu,
                    });

                    polyFeature.setStyle(
                        new Style({
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
                                    color: '#fff',
                                }),
                                stroke: new Stroke({
                                    color: '#000',
                                    width: 2,
                                }),
                            }),
                        })
                    );

                    polyFeatures.push(polyFeature);
                }
            }
        }

        vectorLayer.getSource().clear();
        polygonLayer.getSource().clear();

        vectorLayer.getSource().addFeatures(features);
        polygonLayer.getSource().addFeatures(polyFeatures);
    };

    async function generateMap() {
        if(error) return;
        if(!liveInfo) return;
        setLiveInfo(liveInfo);

        const processedData = liveInfo.map(item => {
            try {
                item.sectors = JSON.parse(item.sectors);
                item.approxLoc = JSON.parse(item.approxLoc);
                item.opened = new Date(item.opened).toLocaleTimeString();
            } catch (e) {}

            return item;
        });

        let features = [];
        let polyFeatures = [];
        for (let atsu of processedData) {
            const { latitude, longitude } = atsu.approxLoc;
            let feature = new Feature({
                geometry: new Point(fromLonLat([longitude, latitude])),
                name: atsu.station_code,
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

            for (let sector of atsu.sectors) {
                let fir = FirBoundaries.features.find(f => f.properties.id === `Y${sector.name}`);
                if (fir) {
                    let geometry = new GeoJSON().readGeometry(fir.geometry) as MultiPolygon;
                    geometry.transform('EPSG:4326', 'EPSG:3857');
                    let polyFeature = new Feature({
                        geometry,
                        name: sector.callsign,
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
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
                    }),
                }),
                polygonLayer,
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
            }),
            controls: defaultControls({
                zoom: false,
            }),
        });

        const selectedStyle = feature => new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 0.15,
                src: '/img/satellite-dish-solid.png',
            }),
            text: new Text({
                text: feature.get('name'),
                offsetY: -30,
                fill: new Fill({
                    color: '#aaaaff',
                }),
                stroke: new Stroke({
                    color: '#000',
                    width: 2
                })
            })
        });

        const pointSelect = new Select({
            condition: (evt) => evt.type === 'singleclick' && evt.map.getFeaturesAtPixel(evt.pixel).some(f => f.getGeometry() instanceof Point),
            style: selectedStyle
        });
        map.addInteraction(pointSelect);

        pointSelect.on('select', function (e) {
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
                    feature.setStyle(selectedStyle(feature));
                }

                /*if (geometry instanceof MultiPolygon) {

                    setSelectedFeature(feature);
                }*/
            }
        });

        return map;
    }

    return <div ref={mapRef} className={className} />;
}