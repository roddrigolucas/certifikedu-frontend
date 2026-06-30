import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Eye, Linkedin, Pencil, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { DataTable } from '@/components/shared/DataTable';
import { TableColumnHeader } from '@/components/shared/DataTable/parts/TableColumnHeader';
import { Button } from '@/components/shared/ui/button';

import { authApi } from '@/services/api/api';

// Defined to match the Table's needs
interface AchievementData {
  id: string;
  achievement: string; // Title
  pontos: number; // XP
  data: string; // Date ISO
  status: string; // 'COMPLETED' | 'IN_PROGRESS' | 'ACTIVE' | 'INACTIVE'
  progress: number;
}

interface AchievementsTableProps {
  isPJ?: boolean;
}

export default function AchievementsTable({ isPJ = false }: AchievementsTableProps) {
  const [data, setData] = useState<AchievementData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        setIsLoading(true);
        let formattedData: AchievementData[] = [];

        if (isPJ) {
          const response = await authApi.get('/leveling/pj/achievements');

          formattedData = response.data
            .filter((item: any) => item.type === 'ACHIEVEMENT')
            .map((item: any) => ({
              id: item.id,
              achievement: item.achievement, // Mapped from backend 'achievement'
              pontos: item.pontos, // Mapped from backend 'pontos'
              data: item.data, // Mapped from backend 'data'
              status: item.status.toUpperCase(), // 'active' -> 'ACTIVE'
              progress: 0,
            }));
        } else {
          const response = await authApi.get('/leveling/pf/achievements');

          formattedData = response.data.map((item: any) => ({
            id: item.mission.id,
            achievement: item.mission.title,
            pontos: item.mission.xpReward,
            data: item.updatedAt,
            status: item.status, // 'COMPLETED' or 'IN_PROGRESS'
            progress: (item.currentCount / item.mission.requiredCount) * 100,
          }));
        }

        setData(formattedData);
      } catch (error) {
        console.error('Failed to fetch achievements', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAchievements();
  }, [isPJ]);

  // --- Helper to safely format dates ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';

    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
          {isPJ ? (
            // PJ Status Badges
            row.original.status === 'ACTIVE' ? (
              <span className="rounded-xl bg-[#2B9A66] px-3 py-1 text-xs font-semibold text-white">
                Ativa
              </span>
            ) : (
              <span className="rounded-xl bg-[#EF4444] px-3 py-1 text-xs font-semibold text-white">
                Inativa
              </span>
            )
          ) : // PF Status Badges
          row.original.status === 'COMPLETED' ? (
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
      cell: ({ row }) => <span>{formatDate(row.original.data)}</span>,
      enableSorting: true,
    },
    {
      id: 'acoes',
      header: ({ column }) => <TableColumnHeader column={column} title="Ações" />,
      cell: ({ row }) => (
        <div className="flex gap-3">
          {isPJ ? (
            /* PJ Actions */
            <>
              <Link to={`/levelingPJ/achievementDetail/${row.original.id}`}>
                <Button variant="ghost" className="border border-slate-200" size="icon">
                  <Eye className="size-4 text-slate-600" />
                </Button>
              </Link>
              <Link to={`/levelingPJ/achievementEdit/${row.original.id}`}>
                <Button variant="ghost" className="border border-slate-200" size="icon">
                  <Pencil className="size-4 text-slate-600" />
                </Button>
              </Link>
            </>
          ) : (
            /* PF Actions */
            <>
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
