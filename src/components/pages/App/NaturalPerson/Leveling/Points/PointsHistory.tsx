import { useEffect, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { ChevronLeft, Search, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ApplicationLayout } from '@/components/layouts/app';
import { DataTable } from '@/components/shared/DataTable';
import { TableColumnHeader } from '@/components/shared/DataTable/parts/TableColumnHeader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shared/ui/select';

import { authApi } from '@/services/api/api';

interface Mission {
  id: number;
  actionDescription: string;
  status: string;
  progress: number;
  category: string;
  xpEarned: number;
  createdAt: any;
}

const columns: ColumnDef<Mission>[] = [
  {
    accessorKey: 'actionDescription',
    header: ({ column }) => <TableColumnHeader column={column} title="Ação" />,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img src="/staticImages/achievementBagde.svg" alt="" />
        <span>{row.original.actionDescription}</span>
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'xpReward',
    header: ({ column }) => <TableColumnHeader column={column} title="Pontos" />,
    cell: ({ row }) => <span>{row.original.xpEarned} XP</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'missionDate',
    header: ({ column }) => <TableColumnHeader column={column} title="Data" />,

    cell: ({ row }) => {
      const dateValue = row.original.createdAt;

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
];

export default function PointsHistory() {
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<Mission[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await authApi.get(`/leveling/pf/history`);

        setPageData(response.data);

        const totalXp = response.data.reduce((accumulator: any, currentItem: any) => {
          return accumulator + currentItem.xpEarned;
        }, 0);

        setXpEarned(totalXp);
      } catch (error) {
        console.error('Failed to fetch gamification data', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ApplicationLayout
      icon={Trophy}
      title="Histórico de pontos"
      isPageLoading={loading}
      hideCredits={true}
    >
      <Link to={'/leveling'}>
        <div className="flex items-center gap-4 text-sm font-bold">
          <ChevronLeft />
          Voltar para Missões & Conquistas
        </div>
      </Link>

      <div className="flex  gap-3">
        <div className=" flex h-10 w-full max-w-[40%]  items-center rounded-lg border border-[#94A3B8] bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50">
          <Search className="ml-3" />
          <input
            placeholder="Pesquisar"
            className=" relative size-full rounded-lg border-r py-2 pl-2 focus:outline-none"
          />
        </div>
        <div className="w-[15%] rounded-lg border border-[#94A3B8]">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'active'}>Ativa</SelectItem>
              <SelectItem value={'unlocked'}>Desbloqueada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[25%] items-center justify-center gap-3 rounded-lg border border-[#EA580C]">
          <span className="text-sm 2xl:text-lg">Pontos acumulados </span>
          <span className="text-lg font-bold">{xpEarned} XP</span>
        </div>
      </div>

      <div className="w-full rounded-xl bg-transparent">
        <DataTable
          columns={columns}
          data={pageData}
          filterColumn="acao"
          showHeader={false}
          showFooter={true}
        />
      </div>
    </ApplicationLayout>
  );
}
