import React, { useState } from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/shared/ui/radio-group';

import { useGalleryContext } from '@/hooks/core/useGallery';

type QRCodePosition = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';

const QRCodePositionSelector: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<QRCodePosition>('TOP_RIGHT');
  const { setQrCodeImage } = useGalleryContext();

  const positions: { label: string; value: QRCodePosition; positionClass: string }[] = [
    { label: 'TOP_RIGHT', value: 'TOP_RIGHT', positionClass: 'justify-end items-start' },
    { label: 'TOP_LEFT', value: 'TOP_LEFT', positionClass: 'justify-start items-start' },
    { label: 'BOTTOM_LEFT', value: 'BOTTOM_LEFT', positionClass: 'justify-start items-end' },
    { label: 'BOTTOM_RIGHT', value: 'BOTTOM_RIGHT', positionClass: 'justify-end items-end' },
  ];

  return (
    <div className="mt-5 px-5">
      <div className="2xl:w-1/2">
        <RadioGroup
          onValueChange={(e: QRCodePosition) => setSelectedPosition(e as QRCodePosition)}
          className="mb-5"
          value={selectedPosition}
        >
          <div className="grid grid-cols-4 gap-4">
            {positions.map((position) => (
              <div
                onClick={() => {
                  setSelectedPosition(position.value);
                  setQrCodeImage(position.value);
                }}
                key={position.value}
                className="col-span-1"
              >
                <label
                  className={`flex cursor-pointer flex-col items-center rounded-lg p-4 ${
                    selectedPosition === position.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div
                    className={`relative flex h-16 w-full rounded-lg bg-gray-200 ${position.positionClass}`}
                  >
                    <div className="m-1 size-6 bg-blue-500"></div>
                  </div>
                </label>
                <div className="flex justify-center">
                  <RadioGroupItem className="size-5" value={position.value} id={position.value} />
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default QRCodePositionSelector;
