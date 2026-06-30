import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Linkedin, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/shared/DataTable';
import { TableColumnHeader } from '@/components/shared/DataTable/parts/TableColumnHeader';
import { Button } from '@/components/shared/ui/button';

import { authApi } from '@/services/api/api';

interface AchievementData {
  id: string;
  achievement: string; // Title
  pontos: number; // XP Reward
  data: string; // Date ISO
  status: 'COMPLETED' | 'IN_PROGRESS';
  progress: number;
}

export default function DashTable() {
  const [data, setData] = useState<AchievementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await authApi.get('/leveling/pf/achievements');

        const formattedData = response.data.map((item: any) => ({
          id: item.mission.id,
          achievement: item.mission.title,
          pontos: item.mission.xpReward,
          data: item.updatedAt, // Date achieved or last updated
          status: item.status,
          progress: (item.currentCount / item.mission.requiredCount) * 100,
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch achievements', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAchievements();
  }, []);

  const columns: ColumnDef<AchievementData>[] = [
    {
      accessorKey: 'achievement',
      header: ({ column }) => <TableColumnHeader column={column} title="Conquista" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src="/staticImages/achievementBagde.svg" alt="" className="size-8" />
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
          {row.original.status === 'COMPLETED' ? (
            <span className="rounded-xl bg-[#2B9A66] px-3 py-1 text-xs font-semibold text-white">
              Desbloqueada
            </span>
          ) : (
            <span className="rounded-xl bg-[#EA580C] px-3 py-1 text-xs font-semibold text-white">
              Ativa ({Math.floor(row.original.progress)}%)
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
      header: ({ column }) => <TableColumnHeader column={column} title="Data" />,
      cell: ({ row }) => (
        <span>
          {row.original.data ? new Date(row.original.data).toLocaleDateString('pt-BR') : '-'}
        </span>
      ),
      enableSorting: true,
    },
    {
      id: 'acoes',
      header: ({ column }) => <TableColumnHeader column={column} title="Ações" />,
      cell: ({ row }) => (
        <div className="flex gap-3">
          <Link to={`/leveling/achievements/${row.original.id}/detail`}>
            <Button variant="ghost" className="border border-slate-200" size="icon">
              <Eye className="size-4 text-slate-600" />
            </Button>
          </Link>

          {row.original.status === 'COMPLETED' && (
            <>
              <Link to={`/leveling/achievements/${row.original.id}/share`}>
                <Button variant="ghost" className="border border-slate-200" size="icon">
                  <Share2 className="size-4 text-slate-600" />
                </Button>
              </Link>

              <Button variant="ghost" className="border border-slate-200" size="icon">
                <Linkedin className="size-4 text-slate-600" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Carregando conquistas...</div>;
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
