import { useState } from 'react';

import { CopyCheckIcon, CopyIcon, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shared/ui/tooltip';

import { cn } from '@/utils';

interface ICopy {
  apiKey: string;
}

const CopyButton = ({ apiKey }: ICopy) => {
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 1000);
      },
      () => {},
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative rounded-lg bg-white py-3">
        <div className="inline-flex items-center md:gap-4 ">
          <Input
            type={isKeyVisible ? 'text' : 'password'}
            value={apiKey}
            readOnly
            onClick={() => {
              isKeyVisible ? copyToClipboard() : null;
            }}
            className={cn(
              'w-[275px] h-12',
              { 'cursor-copy hover:bg-slate-200 ': isKeyVisible },
              { 'focus:border-blue-zodiac-200 focus:bg-white': copySuccess },
            )}
          />
          <div className="inline-flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={toggleVisibility}
                    className="text-slate-600 focus:outline-none"
                  >
                    {isKeyVisible ? <EyeOff className="size-6" /> : <Eye className="size-6" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isKeyVisible ? 'Esconder' : 'Visualizar'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {isKeyVisible && (
              <TooltipProvider>
                <Tooltip open={copySuccess}>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={copyToClipboard}
                      className={cn('text-slate-600 focus:outline-none active:bg-emerald-50', {
                        'hover:bg-emerald-50': copySuccess,
                      })}
                    >
                      {copySuccess ? (
                        <CopyCheckIcon className="size-5 text-emerald-500" />
                      ) : (
                        <CopyIcon className="size-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    className={cn({
                      'border-emerald-500 bg-emerald-500': copySuccess,
                    })}
                  >
                    <p>{copySuccess ? 'Copiado' : 'Copiar API Key'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopyButton;
