// CustomNode.tsx
import React, { memo } from 'react';

import { Handle, NodeProps, NodeToolbar, Position } from 'reactflow';

import { cn } from '@/utils';

export type CustomNodeProps = NodeProps & {
  data: {
    label: string;
    completed: boolean;
    onClick: (id: string) => void;
    index?: number;
  };
};

const CustomNodeComponent: React.FC<CustomNodeProps> = ({ id, data, isConnectable }) => {
  return (
    <>
      <NodeToolbar offset={0} position={Position.Bottom} align={'end'} isVisible>
        <span
          className={cn('border-2 p-1 inline-flex items-center justify-center size-7 text-lg font-bold', {
            ' text-red-500': !data.completed,
            ' text-green-500': data.completed,
          })}
        >
          ✓
        </span>
      </NodeToolbar>
      <div
        className={cn(
          'group relative flex flex-col items-center justify-center transition-all duration-300',
          'cursor-pointer',
        )}
        onClick={() => data.onClick(id)}
      >
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          className="opacity-0"
        />

        {/* Ordinal Number Side Badge */}
        {data.index !== undefined && (
          <div className="absolute -left-4 -top-2 z-20 flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 font-bold text-white shadow-lg">
            {data.index}º
          </div>
        )}

        {/* The Badge Container */}
        <div
          className={cn(
            'flex flex-col items-center justify-center p-3 rounded-2xl border-2 bg-white/90 backdrop-blur-sm shadow-md transition-all group-hover:shadow-xl group-hover:scale-105',
            data.completed ? 'border-green-500 bg-green-50/50' : 'border-gray-200',
          )}
        >
          <img
            src="/assets/pdi/badge.png"
            alt="Badge"
            className={cn(
              'size-16 object-contain mb-2',
              !data.completed &&
                'grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100',
            )}
          />
          <span className="max-w-[120px] text-center text-sm font-bold leading-tight text-gray-800">
            {data.label}
          </span>
        </div>

        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="opacity-0"
        />
      </div>
    </>
  );
};

export const CustomNode = memo(CustomNodeComponent);
