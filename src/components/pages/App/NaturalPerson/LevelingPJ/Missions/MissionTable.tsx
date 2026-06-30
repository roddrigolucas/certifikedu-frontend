import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/shared/DataTable';
import { TableColumnHeader } from '@/components/shared/DataTable/parts/TableColumnHeader';
import { Button } from '@/components/shared/ui/button';

import { authApi } from '@/services/api/api';

interface MissionData {
  id: string;
  achievement: string; // Title
  pontos: number; // XP
  data: string; // ISO Date
  status: string; // 'active' | 'inactive'
}

interface AchievementsTableProps {
  isPJ?: boolean;
}

export default function MissionTable({ isPJ = false }: AchievementsTableProps) {
  const [data, setData] = useState<MissionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Data from Backend
  useEffect(() => {
    async function fetchMissions() {
      try {
        const response = await authApi.get('/leveling/pj/missions');

        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch missions', error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isPJ) {
      fetchMissions();
    }
  }, [isPJ]);

  // Helper to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const columns: ColumnDef<MissionData>[] = [
    {
      accessorKey: 'achievement',
      header: ({ column }) => <TableColumnHeader column={column} title="Missão" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src="/staticImages/missionBadge.svg" alt="" className="size-8" />
          <span className="font-medium">{row.original.achievement}</span>
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => <TableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <div>
          {row.original.status === 'active' ? (
            <span className="rounded-xl bg-[#2B9A66] px-3 py-1 text-xs font-semibold text-white">
              Ativa
            </span>
          ) : (
            <span className="rounded-xl bg-slate-400 px-3 py-1 text-xs font-semibold text-white">
              Inativa
            </span>
          )}
        </div>
      ),
      enableSorting: true,
    },
    {
      accessorKey: 'pontos',
      header: ({ column }) => <TableColumnHeader column={column} title="Pontos" />,
      cell: ({ row }) => <span className="font-bold text-gray-600">{row.original.pontos} XP</span>,
      enableSorting: true,
    },
    {
      accessorKey: 'data',
      header: ({ column }) => <TableColumnHeader column={column} title="Data de Criação" />,
      cell: ({ row }) => <span>{formatDate(row.original.data)}</span>,
      enableSorting: true,
    },
    {
      id: 'acoes',
      header: ({ column }) => <TableColumnHeader column={column} title="Ações" />,
      cell: ({ row }) => (
        <div className="flex gap-3">
          {/* PJ VIEW ACTIONS */}
          {isPJ ? (
            <>
              {/* View Details */}
              <Link to={`/levelingPJ/missionDetail/${row.original.id}`}>
                <Button variant="ghost" className="border border-slate-200" size="icon">
                  <Eye className="size-4 text-slate-600" />
                </Button>
              </Link>

              {/* Edit (Functionality to be added later) */}
              <Link to={`/levelingPJ/missionEdit/${row.original.id}`}>
                <Button variant="ghost" className="border border-slate-200" size="icon">
                  <Pencil className="size-4 text-slate-600" />
                </Button>
              </Link>
            </>
          ) : (
            // PF VIEW ACTIONS (If this table is reused for students)
            // ... PF specific buttons
            <span className="text-sm text-gray-400">-</span>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Carregando missões...</div>;
  }

  return (
    <div className="w-full rounded-xl bg-transparent">
      <DataTable
        columns={columns}
        data={data}
        filterColumn="achievement"
        showHeader={false}
        showFooter={true}
      />
    </div>
  );
}
