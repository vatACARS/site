import { useState } from 'react';
import Map from '../comp/ui/Map';

import { FaPlane } from "react-icons/fa6";
import { BiTransferAlt } from "react-icons/bi";

export default function Stats2() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <>
      <div>
        <Map setSelectedFeature={setSelectedFeature} />
        {selectedFeature && (
        <div className="absolute shadow-2xl right-10 top-10 px-2 py-2 bg-slate-900 text-slate-50 bg-opacity-80 rounded-md">
          <div className="py-1 px-2 flex flex-col space-y-2">
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
                    <span>51</span>
                  </div>
                  <div className="flex items-center text-green-500 flex-row space-x-1">
                    <FaPlane />
                    <span>2</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row space-x-4 justify-between items-center">
                <p>Online from:</p>
                <span>{selectedFeature.get('details').opened}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedFeature.get('details').sectors.map((sector, index) => (
                  <div key={index} className="flex flex-col -space-y-1 border-2 border-slate-700 rounded-md py-1 px-6 text-center">
                    <span className="font-semibold tracking-wide text-slate-300">{sector.callsign}</span>
                    <p className="font-bold text-slate-500">{(sector.frequency / 1000000).toFixed(3).replace(/\.?0+$/, '')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}