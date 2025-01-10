import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import 'ol/ol.css';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import GeoJSON from 'ol/format/GeoJSON';
import { fromLonLat } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import { Cluster } from 'ol/source';
import CircleStyle from 'ol/style/Circle';
import Text from 'ol/style/Text';

const fetcher = (url) => fetch(url).then((res) => res.json());

const MapComponent = ({ className }) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const { data: statisticsResponse } = useSWR('/api/statistics', fetcher, { refreshInterval: 10000 });
    const { data: networkData } = useSWR('/api/map/network', fetcher, { refreshInterval: 5000 });
    const [firData, setFirData] = useState(null);
    const [airports, setAirports] = useState(null);

    const layerRefs = useRef({
        atsuLayer: new VectorLayer({ source: new VectorSource() }),
        airportsLayer: new VectorLayer({
            source: new VectorSource(),
            style: feature => {
                const airport = feature.get("details");
                const groundDep = airport?.network?.aircraft?.groundDep?.length || 0;
                const groundArr = airport?.network?.aircraft?.groundArr?.length || 0;
                const prefiles = airport?.network?.aircraft?.prefiles?.length || 0;

                const styles = [
                    new Style({
                        image: new CircleStyle({
                            radius: 2,
                            fill: new Fill({
                                color: 'rgba(255, 255, 255, 0.3)',
                            }),
                        }),
                    }),
                    new Style({
                        text: new Text({
                            text: airport.ident,
                            offsetY: -10,
                            font: 'bold 9px Arial',
                            fill: new Fill({
                                color: 'rgba(180, 180, 180, 1)',
                            }),
                            stroke: new Stroke({
                                color: 'rgba(50, 50, 50, 0.5)',
                                width: 4,
                            }),
                        }),
                    }),
                ];

                if (groundDep > 0) {
                    styles.push(new Style({
                        text: new Text({
                            text: `▲ ${groundDep}`,
                            offsetX: 25,
                            offsetY: -6,
                            font: 'bold 10px Arial',
                            fill: new Fill({
                                color: 'rgba(80, 200, 80, 0.8)',
                            }),
                            stroke: new Stroke({
                                color: 'rgba(0, 0, 0, 0.5)',
                                width: 3,
                            }),
                        }),
                    }));
                }

                if (groundArr > 0) {
                    styles.push(new Style({
                        text: new Text({
                            text: `▼ ${groundArr}`,
                            offsetX: 25,
                            offsetY: 6,
                            font: 'bold 10px Arial',
                            fill: new Fill({
                                color: 'rgba(200, 80, 80, 0.8)',
                            }),
                            stroke: new Stroke({
                                color: 'rgba(0, 0, 0, 0.5)',
                                width: 3,
                            }),
                        }),
                    }));
                }

                if (prefiles > 0) {
                    styles.push(new Style({
                        text: new Text({
                            text: `▸ ${prefiles}`,
                            offsetX: 40,
                            font: 'bold 10px Arial',
                            fill: new Fill({
                                color: 'rgba(150, 150, 150, 0.8)',
                            }),
                            stroke: new Stroke({
                                color: 'rgba(0, 0, 0, 0.5)',
                                width: 3,
                            }),
                        }),
                    }));
                }

                return styles;
            }
        }),
        aircraftLayer: new VectorLayer({ source: new VectorSource() }),
        aircraftClusterLayer: new VectorLayer({
            source: new Cluster({
                distance: 40,
                minDistance: 20,
                source: new VectorSource(),
            }),
            style: (feature) => {
                const features = feature.get('features');
                if (!features) return null;

                const size = features.length;
                if (size === 1) {
                    const pilot = features[0].get('details');
                    return new Style({
                        image: new Icon({
                            anchor: [0.5, 0.5],
                            scale: 0.8,
                            rotation: pilot?.heading * (Math.PI / 180) || 0,
                            src: '/img/a320dark.webp',
                        }),
                    });
                } else {
                    return [
                        new Style({
                            image: new CircleStyle({
                                radius: 20 + Math.min(size * 2, 20),
                                fill: new Fill({
                                    color: 'rgba(0, 128, 255, 0.2)',
                                }),
                                stroke: new Stroke({
                                    color: 'rgba(0, 128, 255, 0.4)',
                                    width: 2,
                                }),
                            }),
                        }),
                        new Style({
                            image: new Icon({
                                anchor: [0.5, 0.5],
                                scale: 0.8 + Math.min(size * 0.1, 1),
                                src: '/img/a320.webp',
                            }),
                        }),
                        new Style({
                            text: new Text({
                                text: size.toString(),
                                offsetX: 15,
                                offsetY: -15,
                                font: 'bold 12px Arial',
                                fill: new Fill({
                                    color: '#fff',
                                }),
                                stroke: new Stroke({
                                    color: 'rgba(0, 0, 0, 0.5)',
                                    width: 4,
                                }),
                            }),
                        }),
                    ];
                }
            },

        })
    }).current;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [firDataResponse, airportsDataResponse] = await Promise.all([
                    fetch('/api/thirdparty/getFirData'),
                    fetch('/api/map/airports')
                ]);

                const [firData, airports] = await Promise.all([
                    firDataResponse.json(),
                    airportsDataResponse.json()
                ]);

                setFirData(firData);
                setAirports(airports);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!firData || !airports || map) return;

        const boundariesLayer = new VectorLayer({ source: new VectorSource() });

        const mapInstance = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                    }),
                }),
                boundariesLayer,
                layerRefs.atsuLayer,
                layerRefs.airportsLayer,
                layerRefs.aircraftClusterLayer,
            ],
            view: new View({
                center: fromLonLat([0, 0]),
                zoom: 2,
                minZoom: 2,
                maxZoom: 12,
            }),
            controls: defaultControls({
                zoom: false,
            }),
        });

        const firFeatures = firData.features.map((feature) => {
            const geometry = new GeoJSON().readGeometry(feature.geometry);
            geometry.transform('EPSG:4326', 'EPSG:3857');
            const firFeature = new Feature({ geometry });
            firFeature.setStyle(
                new Style({
                    fill: new Fill({ color: 'rgba(0, 0, 0, 0.005)' }),
                    stroke: new Stroke({ color: 'rgba(255, 255, 255, 0.01)', width: 1 }),
                })
            );
            return firFeature;
        });

        boundariesLayer.getSource().addFeatures(firFeatures);

        mapInstance.on('moveend', () => {
            const zoomLevel = mapInstance.getView().getZoom();
            layerRefs.aircraftClusterLayer.getSource().setDistance(zoomLevel < 5 ? 60 : 0);
        });

        setMap(mapInstance);
    }, [firData, airports, map]);

    useEffect(() => {
        if (!map || !statisticsResponse?.stations || !airports || !networkData?.pilots) return;

        layerRefs.atsuLayer.getSource().clear();
        const atsuFeatures = airports
            .filter((airport) => statisticsResponse.stations.some((station) =>
                station.logonCode.includes(airport.ident)
            ))
            .map((airport) => {
                const marker = new Feature({
                    geometry: new Point(fromLonLat([airport.longitude_deg, airport.latitude_deg])),
                });
                marker.setStyle(
                    new Style({
                        image: new Icon({
                            src: '/img/satellite-dish-solid.png',
                            scale: 0.1,
                        }),
                    })
                );
                return marker;
            });

        layerRefs.atsuLayer.getSource().addFeatures(atsuFeatures);

        const aircraftClusterSource = new VectorSource();
        const aircraftFeatures = networkData.pilots
            .filter((pilot) => !Object.values(networkData.airports || {}).some((airport: any) =>
                airport.aircraft.groundArr?.includes(pilot.cid) ||
                airport.aircraft.groundDep?.includes(pilot.cid)
            ))
            .map((pilot) => {
                const feature = new Feature({
                    geometry: new Point([pilot.longitude, pilot.latitude]),
                    name: pilot.callsign,
                    details: pilot,
                });
                return feature;
            });

        aircraftClusterSource.addFeatures(aircraftFeatures);
        layerRefs.aircraftClusterLayer.getSource().setSource(aircraftClusterSource);

        const airportsLayerSource = layerRefs.airportsLayer.getSource();
        airportsLayerSource.clear();
        console.log(networkData.airports);
        const airportFeatures = airports
            .filter((airport) => networkData.airports.some((station) =>
                station.icao === airport.ident && (station.aircraft
                    && station.aircraft.arrivals?.length > 0
                    || station.aircraft.departures?.length > 0
                    || station.aircraft.groundArr?.length > 0
                    || station.aircraft.groundDep?.length > 0
                )
            ))
            .map((airport) => {
                const networkAirport = networkData.airports.find(station =>
                    station.icao.includes(airport.ident)
                );

                const marker = new Feature({
                    geometry: new Point(fromLonLat([airport.longitude_deg, airport.latitude_deg])),
                    name: airport.ident,
                    details: {
                        ...airport,
                        network: networkAirport
                    }
                });
                return marker;
            });

        airportsLayerSource.addFeatures(airportFeatures);
    }, [map, statisticsResponse, airports, networkData]);


    return (
        <div
            ref={mapRef}
            className={`
                    ${className}
                    transition-all duration-300 ease-in-out
                `}
        />
    );
};

export default MapComponent;