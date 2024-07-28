import { useState } from 'react';
import Map from '../comp/ui/Map';

import SEO from '../comp/meta/SEO';

import { FaPlane } from "react-icons/fa6";
import { BiTransferAlt } from "react-icons/bi";
import { IoArrowBack } from "react-icons/io5";

function timeAgo(date) {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const seconds = Math.floor((new Date().getTime() - date) / 1000);
  
  const intervals = [
    { value: 31536000, unit: 'year' },
    { value: 2592000, unit: 'month' },
    { value: 86400, unit: 'day' },
    { value: 3600, unit: 'hour' },
    { value: 60, unit: 'minute' },
    { value: 1, unit: 'second' }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count >= 1) {
      return rtf.format(-count, interval.unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return rtf.format(0, 'second');
}

export default function Stats2() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [liveInfo, setLiveInfo] = useState(null);

  return (
    <>
      <SEO title="Live Coverage" />
      <div>
        <div className="h-full w-full flex flex-col bg-[#090909]">
          <div className="h-[72px]">
            <a href="/">
              <div className="flex flex-row space-x-4 h-full px-12 text-[#cdcdcd] text-2xl items-center">
                <div className="py-1 px-2 rounded-md border-l-2 border-notsodark hover:border-blue-500 hover:text-blue-500 cursor-pointer transition-all duration-300">
                  <IoArrowBack />
                </div>
                <p>Live Coverage Map</p>
              </div>
            </a>
          </div>
          <div className="relative border-t-2 border-b-2 border-[#262626] bg-[#262626] overflow-hidden">
            <Map setSelectedFeature={setSelectedFeature} setLiveInfo={setLiveInfo} className="h-[calc(100vh-124px)] w-[100%]" />

            <div className="absolute bottom-10 flex justify-center w-full">
              <div className="shadow-2xl bottom-10 max-w-7xl w-full mx-24 px-2 py-2 bg-[#090909] border-2 border-[#454545] text-slate-50 bg-opacity-80 rounded-md">
                <div className="py-1 px-2 flex flex-col space-y-2">
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-[10px] h-[10px] border-[1.5px] border-green-300 bg-green-600 rounded-full animate-pulse" />
                        <span className="text-md text-[#cdcdcd] tracking-wider">
                          {liveInfo?.length == 0 ? "No" : liveInfo?.length} Station{liveInfo?.length == 1 ? "" : "s"} Connected
                        </span>
                      </div>
                      <div className="flex space-x-4">
                        <p>other info here to be decided...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {selectedFeature && (
              <div className="absolute shadow-2xl right-10 top-10 px-2 py-2 bg-[#090909] border-2 border-[#454545] text-[#bcbcbc] bg-opacity-80">
                <div className="py-1 px-2">
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl tracking-wider font-semibold">
                          {selectedFeature.get('details').station_code}
                        </span>
                        <div className="w-[10px] h-[10px] border-[1.5px] border-green-300 bg-green-600 rounded-full animate-pulse" />
                      </div>
                      <div className="flex space-x-4">
                        <div className="flex items-center text-blue-500 flex-row space-x-[2px]">
                          <BiTransferAlt className="text-2xl font-bold" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center text-green-500 flex-row space-x-1">
                          <FaPlane />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm -mt-1 text-[#5a5a5a]">
                    <p>CID <span>{selectedFeature.get('details').cid}</span></p>
                    <span>{timeAgo(selectedFeature.get('details').opened)}</span>
                  </div>
                  <div className="flex flex-col mt-2 space-y-2">
                    <span className="">Coverage</span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedFeature.get('details').sectors.map((sector, index) => (
                        <div key={index} className="flex flex-col -space-y-1 border-2 border-[#454545] py-1 px-6 text-center">
                          <span className="font-semibold tracking-wide text-[#bcbcbc]">{sector.callsign}</span>
                          <p className="font-bold text-[#5a5a5a]">{(sector.frequency / 1000000).toFixed(3).replace(/\.?0+$/, '')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="h-[48px]">
            <div className="flex h-full px-4 text-[#454545] font-semibold text-sm items-center justify-end">
              <div className="flex space-x-4">
                <p className="after:content-['|'] after:ml-4">FIR Boundaries &copy; <a href="https://github.com/vatsimnetwork/vatspy-data-project" className="text-[#565656] underline">VATSIM</a></p>
                <p className="after:content-['|'] after:ml-4">Map Imagery &copy; <a href="https://cartodb.com/attribution" className="text-[#565656] underline">CartoDB</a></p>
                <p className="after:content-['|'] after:ml-4">Aircraft Icons &copy; <a href="https://www.patreon.com/vatsimradar24" className="text-[#565656] underline">VATSIM Radar</a></p>
                <p className="text-[#565656] font-semibold">&copy; vatACARS Team 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}