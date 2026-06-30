/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from 'react';

import ReactFlow, {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import 'reactflow/dist/style.css';

import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { BookA } from 'lucide-react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { pagePaths } from '@/constants/navigation/pagePaths';

import { ApplicationLayout } from '@/components/layouts/app';
import { BackButton } from '@/components/shared/BackButton';
import { Button } from '@/components/shared/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/shared/ui/sheet';

import useRequestProcessor from '@/hooks/core/useRequest';

import { PDIService } from '@/services/entities/app/core/pdi';

import { CustomNode } from './Nodes/CustomNode';
import { EndNode } from './Nodes/EndNode';

const initBgColor = '#FFFFFF';

const nodeTypes = {
  EndNode: EndNode,
  customNode: CustomNode,
};
type CustomNodeData = {
  label: string;
  onClick?: () => void;
  completed?: boolean;
};

const defaultViewport = { x: 0, y: 0, zoom: 1 };

export default function PDINodeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const { authenticated } = pagePaths;

  const PdiById = useRequestProcessor().query(
    ['PDIbyID', `id: ${id}`],
    async () => await PDIService.GetPDIsById(id ?? ''),
    {
      onError: (error: any) => {
        toast.error(`${error}`);
      },
    },
  );

  function MarkSelected(nodeId: string, completed: boolean) {
    const response = PDIService.MarkSelectedNode(nodeId, { markedAsFinished: completed });

    toast.promise(response, {
      loading: 'Em processamento...',
      success: () => {
        return `Sucesso`;
      },
      error: () => {
        return 'Error';
      },
      finally: () => {
        PdiById.refetch();
      },
    });
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    setIsSheetOpen(true);
  };

  const downloadPdf = useCallback(() => {
    const reactFlowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!reactFlowElement) {
      toast.error('Não foi possível capturar o gráfico para PDF');

      return;
    }

    const imageOptions = {
      backgroundColor: '#ffffff',
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: true,
      filter: (node: Element) => {
        // Skip ReactFlow minimap and controls to avoid rendering issues
        if (node instanceof HTMLElement) {
          const classList = node.classList;
          if (
            classList?.contains('react-flow__minimap') ||
            classList?.contains('react-flow__controls') ||
            classList?.contains('react-flow__attribution')
          ) {
            return false;
          }
        }
        return true;
      },
    };

    toast.promise(
      // html-to-image sometimes fails on the first render due to
      // unresolved images/fonts. Calling toPng twice is a known workaround.
      toPng(reactFlowElement, imageOptions)
        .catch(() => toPng(reactFlowElement, imageOptions))
        .then((dataUrl) => {
          const pdf = new jsPDF('landscape', 'mm', 'a4');
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`PDI_${PdiById?.data?.title || 'Plano'}.pdf`);
        }),
      {
        loading: 'Gerando PDF...',
        success: 'PDF exportado com sucesso!',
        error: 'Erro ao gerar o PDF',
      },
    );
  }, [PdiById.data]);

  useEffect(() => {
    if (PdiById.data?.nodes) {
      const dynamicNodes = PdiById.data.nodes.map((node: any, index: number) => ({
        id: (index + 1).toString(),
        type: 'customNode',
        data: {
          label: node.objective || `Etapa ${index + 1}`,
          onClick: () => handleNodeClick((index + 1).toString()),
          completed: node.markedAsFinished ?? false,
          index: index + 1,
        },
        position: { x: 200, y: index * 180 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      }));

      // Add End Node after all steps
      const endNode = {
        id: (PdiById.data.nodes.length + 1).toString(),
        type: 'EndNode',
        data: { label: 'Emita seu certificado' },
        position: { x: 200, y: PdiById.data.nodes.length * 180 + 100 },
        targetPosition: Position.Top,
      };

      setNodes([...dynamicNodes, endNode]);

      // Generate automatic edges
      const dynamicEdges: Edge[] = [];
      for (let i = 0; i < PdiById.data.nodes.length; i++) {
        const sourceId = (i + 1).toString();
        const targetId = (i + 2).toString();
        dynamicEdges.push({
          id: `e${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          animated: true,
          className: 'stroke-blue-500 stroke-[3px]',
        });
      }
      setEdges(dynamicEdges);
    }
  }, [PdiById.data]);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => addEdge({ ...params, animated: true, className: 'stroke-white' }, eds)),
    [],
  );

  const selectedNode = nodes.find((node) => node.id === selectedNodeId);

  const nodeIndex = selectedNodeId ? parseInt(selectedNodeId, 10) - 1 : -1;
  const ApiSelectedNode = PdiById?.data?.nodes[nodeIndex];

  return (
    <ApplicationLayout
      icon={BookA}
      title="Plano de Desenvolvimento Individual"
      description="Bem-vindo ao seu Plano de Desenvolvimento Individual (PDI)! Aqui você encontrará:
      Metas Personalizadas: Defina e acompanhe seus objetivos profissionais e pessoais.
      Habilidades a Desenvolver: Identifique competências-chave para o seu crescimento.
      Recursos Recomendados: Acesse livros, cursos e materiais selecionados para apoiar sua jornada.
      Progresso em Tempo Real: Monitore seu avanço e celebre suas conquistas ao longo do caminho.
      Explore cada etapa do seu PDI, aproveite as sugestões e dê o próximo passo rumo ao seu desenvolvimento. Estamos aqui para apoiar você em cada fase desta jornada!"
      hideCredits
    >
      <div>
        <BackButton href={authenticated.pdi.root}>Voltar</BackButton>
      </div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">{PdiById.data?.title}</h1>
        <Button onClick={downloadPdf} variant="secondary">
          Exportar para PDF
        </Button>
      </div>
      <div className="h-[500px] rounded-lg border-2">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ background: initBgColor }}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={[20, 20]}
          defaultViewport={defaultViewport}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-[500px] overflow-auto">
          <SheetHeader>
            <SheetTitle>{selectedNode?.data.label}</SheetTitle>
            <SheetDescription>
              Informações detalhadas da {selectedNode?.data.label}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-2 flex justify-end">
            {!ApiSelectedNode?.markedAsFinished && (
              <Button
                onClick={() => MarkSelected(ApiSelectedNode?.nodeId ?? '', true)}
                variant="success"
                size="sm"
                type="button"
              >
                Marcar como concluído
              </Button>
            )}
            {ApiSelectedNode?.markedAsFinished && (
              <Button
                onClick={() => MarkSelected(ApiSelectedNode?.nodeId ?? '', false)}
                variant="destructive"
                size="sm"
                type="button"
              >
                Marcar como incompleto
              </Button>
            )}
          </div>
          <div className="p-4">
            <h1 className="text-md mb-2 font-bold">
              {ApiSelectedNode?.objective ?? 'Sem descrição disponível'}
            </h1>
            <Markdown remarkPlugins={[remarkGfm]}>
              {ApiSelectedNode?.description ?? 'Sem descrição disponível'}
            </Markdown>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div className="mr-auto flex px-4 ">
                <Button variant="secondary" type="button">
                  Fechar
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </ApplicationLayout>
  );
}
