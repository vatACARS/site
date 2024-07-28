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

export default function MapComponent({ setSelectedFeature, setLiveInfo, className, enableInteractions = true }) {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [stationLayer, setStationLayer] = useState(null);
    const [airspaceLayer, setAirspaceLayer] = useState(null);
    const [aircraftLayer, setAircraftLayer] = useState(null);
    const [grabbingMap, setGrabbingMap] = useState(false);

    const { data: liveInfo, error } = useSWR('/api/misc/getStats', fetcher, { refreshInterval: 30000 });
    const { data: networkData, error: networkError } = useSWR('/api/misc/network', fetcher, { refreshInterval: 60000 });

    useEffect(() => {
        if (!map) {
            initializeMap();
        } else {
            updateMap();
        }
    }, [liveInfo, networkData]);

    const initializeMap = () => {
        const initialStationLayer = new VectorLayer({ source: new VectorSource() });
        const initialAirspaceLayer = new VectorLayer({ source: new VectorSource() });
        const initialAircraftLayer = new VectorLayer({ source: new VectorSource() });

        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                    }),
                }),
                initialAirspaceLayer,
                initialAircraftLayer,
                initialStationLayer,
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
        setStationLayer(initialStationLayer);
        setAirspaceLayer(initialAirspaceLayer);
        setAircraftLayer(initialAircraftLayer);

        const selectedStyle = (feature) =>
            new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.15,
                    src: '/img/satellite-dish-solid.png',
                }),
                text: new Text({
                    text: feature.get('name'),
                    font: '12px Montserrat',
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

        if(enableInteractions) {
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
        }

        initialMap.getTargetElement().style.cursor = 'grab';
        initialMap.on('pointerdrag', function() {
            initialMap!.getTargetElement().style.cursor = 'grabbing';
        });
        initialMap.on('pointermove', () => {
            setGrabbingMap(!grabbingMap);
            initialMap.getTargetElement().style.cursor = grabbingMap ? 'grab' : 'pointer'
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

        let stationFeatures = [];
        let airspaceFeatures = [];
        let aircraftFeatures = [];
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
                        font: '12px Montserrat',
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

            stationFeatures.push(feature);

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
                                font: '8px Montserrat',
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

                    airspaceFeatures.push(polyFeature);
                }
            }
        }

        if(networkData) {
            for(const pilot of networkData.pilots) {
                if(!networkData.airports.values().some(airport => airport.aircraft.groundArr?.includes(pilot.cid) || airport.aircraft.groundDep?.includes(pilot.cid))) {
                    const { latitude, longitude, heading, altitude } = pilot;
                    let feature = new Feature({
                        geometry: new Point([longitude, latitude]),
                        name: pilot.callsign,
                        details: pilot,
                    });

                    feature.setStyle(
                        new Style({
                            image: new Icon({
                                anchor: [0.5, 0.5],
                                scale: 1.2,
                                rotation: heading * (Math.PI / 180),
                                src: `/img/a320dark.webp`,
                            }),
                            /*text: new Text({
                                text: pilot.callsign,
                                font: '12px Montserrat',
                                offsetY: 25,
                                fill: new Fill({
                                    color: '#fff',
                                })
                            }),*/
                        })
                    );

                    aircraftFeatures.push(feature);
                }
            }
        }

        stationLayer.getSource().clear();
        airspaceLayer.getSource().clear();
        aircraftLayer.getSource().clear();

        stationLayer.getSource().addFeatures(stationFeatures);
        airspaceLayer.getSource().addFeatures(airspaceFeatures);
        aircraftLayer.getSource().addFeatures(aircraftFeatures);
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
        let airspaceFeatures = [];
        let aircraftFeatures = [];

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
                    font: '12px Montserrat',
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

                    airspaceFeatures.push(polyFeature);
                }
            }
        }

        const stationLayer = new VectorLayer({
            source: new VectorSource({ features }),
        });

        const airspaceLayer = new VectorLayer({
            source: new VectorSource({ features: airspaceFeatures }),
        });

        const aircraftLayer = new VectorLayer({
            source: new VectorSource({ features: aircraftFeatures }),
        });

        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
                    }),
                }),
                airspaceLayer,
                aircraftLayer,
                stationLayer,
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

        if(enableInteractions) {
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
        }

        return map;
    }

    return <div ref={mapRef} className={className} />;
}