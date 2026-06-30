import React, { memo } from 'react';

import { Handle, NodeProps, Position } from 'reactflow';

type EndNodeProps = NodeProps & {
  data: {
    label: string;
  };
  isConnectable: boolean;
};

const EndNodeComponent: React.FC<EndNodeProps> = ({ data, isConnectable }) => {
  return (
    <div className="flex w-80 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white shadow-lg">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="-mt-2 size-3 bg-white"
      />
      <div className="text-center">
        <div className="text-lg font-bold">{data.label}</div>
        <div className="mt-2 text-sm">Fim da Jornada </div>
      </div>
      {/* No source handle since it's the end node */}
    </div>
  );
};

export const EndNode = memo(EndNodeComponent);
