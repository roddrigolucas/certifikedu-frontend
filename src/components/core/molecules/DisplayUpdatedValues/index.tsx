import React from 'react';

import { IPersonUpdateData } from '@/services/entities/app/naturalPerson/profile/types';

interface DataUpdateDisplayProps {
  updates: IPersonUpdateData[];
}

const DataUpdateDisplay: React.FC<DataUpdateDisplayProps> = ({ updates }) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-6">
      <div className="flex flex-col gap-2">
        {updates.map((update, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-slate-600">{update.fieldName}</span>
            <div className="flex items-center gap-12">
              <p className="text-red-500 line-through">{update.oldValue}</p>
              <span className="text-emerald-500">{update.newValue}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataUpdateDisplay;
