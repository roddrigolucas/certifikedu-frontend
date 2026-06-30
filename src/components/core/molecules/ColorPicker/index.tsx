import React, { useEffect, useRef, useState } from 'react';

import { ColorResult, SketchPicker } from 'react-color';

import { Button } from '@/components/shared/ui/button';

import { useGalleryContext } from '@/hooks/core/useGallery';

const ColorPickerComponent: React.FC = () => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const { setFontColor, fontColor } = useGalleryContext();

  const handleButtonClick = () => {
    setDisplayColorPicker((prev) => !prev);
  };

  const handleChange = (colorResult: ColorResult) => {
    setFontColor(colorResult.hex);
  };

  // Handler to detect clicks outside the color picker
  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setDisplayColorPicker(false);
    }
  };

  useEffect(() => {
    if (displayColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayColorPicker]);

  return (
    <div className="relative inline-block text-left">
      <div className="flex flex-row items-center gap-2">
        <Button onClick={handleButtonClick} variant={'outline'} type="button">
          Clique aqui para selecionar
        </Button>
        <div style={{ backgroundColor: fontColor }} className="size-10 rounded-lg"></div>
      </div>

      {displayColorPicker && (
        <div ref={pickerRef} className="absolute z-20 mt-2 rounded-md shadow-lg">
          <div className="shadow-xs rounded-md bg-white p-3">
            <SketchPicker color={fontColor} onChange={handleChange} disableAlpha={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPickerComponent;
