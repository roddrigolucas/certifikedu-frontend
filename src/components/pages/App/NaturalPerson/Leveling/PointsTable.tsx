import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/shared/DataTable';
import { TableColumnHeader } from '@/components/shared/DataTable/parts/TableColumnHeader';
import { Button } from '@/components/shared/ui/button';

interface PointsTableProps {
  missionsData: Mission[];
}

interface Mission {
  id: number;
  title: string;
  status: string;
  progress: number;
  category: string;
  xpReward: number;
  missionDate: any;
}

const columns: ColumnDef<Mission>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => <TableColumnHeader column={column} title="Ação" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src="/staticImages/achievementBagde.svg" alt="" />
        <span>{row.original.title}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'xpReward',
    header: ({ column }) => <TableColumnHeader column={column} title="Pontos" />,
    cell: ({ row }) => <span>{row.original.xpReward} XP</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'missionDate',
    header: ({ column }) => <TableColumnHeader column={column} title="Data" />,

    cell: ({ row }) => {
      const dateValue = row.original.missionDate;

      const date = new Date(dateValue);

      const formattedDate = date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      return <span>{formattedDate}</span>;
    },
    // FIM DA ALTERAÇÃO

    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'acoes',
    header: ({ column }) => <TableColumnHeader column={column} title="Ações" />,
    cell: () => (
      <Button variant="ghost" size="icon">
        <img src="/staticImages/share.svg" alt="" />
      </Button>
    ),
  },
];

// Componente da tabela
export default function PointsTable({ missionsData }: PointsTableProps) {
  const completedMissions = missionsData.filter((mission) => mission.status === 'COMPLETED');
  const limitedMissions = completedMissions.slice(0, 3);

  return (
    <div className="bg-transparentborder-[#E2E8F0] w-full rounded-xl border-[1px] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Histórico de pontos</h2>
        <Link to={'/leveling/points'}>
          <Button variant="outline" className="border-[#94A3B8] text-lg">
            Histórico completo
          </Button>
        </Link>
      </div>
      {limitedMissions && limitedMissions.length > 0 && (
        <DataTable
          columns={columns}
          data={limitedMissions}
          filterColumn="title"
          showHeader={false}
          showFooter={false}
        />
      )}
      {limitedMissions.length === 0 && (
        <p className="py-8 text-center text-gray-500">Nenhuma missão completada encontrada.</p>
      )}
    </div>
  );
}
