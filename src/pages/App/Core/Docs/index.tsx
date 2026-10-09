import { Helmet } from 'react-helmet';
import { FcDownload } from 'react-icons/fc';
import { BookOpen, Key, Link as LinkIcon, Download, LayoutDashboard, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Logo } from '@/components/core/atoms/Logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/shared/ui/tabs';
import { Button } from '@/components/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shared/ui/card';

const MoodleInstructions = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado com sucesso!`);
  };

  const backendUrl = import.meta.env.VITE_API_URL || 'https://api.certifikedu.com.br';

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <h3 className="mb-2 text-xl font-bold text-blue-900">Configuração da Integração LTI 1.3 (Advantage)</h3>
        <p className="mb-4 text-sm text-slate-600">
          A integração com o Moodle permite que seus alunos e professores acessem a CertifikEDU diretamente de seus cursos, 
          sem precisar de uma nova senha (Single Sign-On). O processo de configuração envolve criar uma &quot;Ferramenta Externa&quot; no Moodle.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LayoutDashboard className="size-5 text-blue-600" />
              Passo 1: Ativar no CertifikEDU
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>1. Solicite ao administrador da CertifikEDU que ative a integração para a sua instituição (PJ).</p>
            <p>2. Vá em <strong className="text-blue-700">Integração Moodle</strong> no painel de administração da sua instituição.</p>
            <p>3. Lá, você deverá inserir os dados (Client ID, Deployment ID, etc.) gerados pelo seu Moodle.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LinkIcon className="size-5 text-blue-600" />
              Passo 2: Configurar no Moodle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-600">
            <p>1. No Moodle, vá em <strong>Administração do site &gt; Plugins &gt; Ferramenta Externa (LTI) &gt; Gerenciar Ferramentas</strong>.</p>
            <p>2. Clique em <strong>&quot;Configurar ferramenta manualmente&quot;</strong>.</p>
            <p>3. Escolha &quot;LTI 1.3&quot; na versão da ferramenta e preencha os endpoints abaixo.</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-100 bg-slate-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Endpoints da CertifikEDU (Para inserir no Moodle)</CardTitle>
          <CardDescription>Copie as URLs abaixo e cole nos campos correspondentes da Ferramenta Externa no Moodle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-white p-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-700">Tool URL (URL da Ferramenta / Launch URL)</p>
              <code className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">{backendUrl}/moodle-lti/launch</code>
            </div>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/launch`, 'Tool URL')}>
              <Copy className="mr-2 size-4" /> Copiar
            </Button>
          </div>
          
          <div className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-white p-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-700">Initiate Login URL (URL de Login OIDC)</p>
              <code className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">{backendUrl}/moodle-lti/login</code>
            </div>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/login`, 'Login URL')}>
              <Copy className="mr-2 size-4" /> Copiar
            </Button>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 rounded-lg border bg-white p-3 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold text-slate-700">Public Keyset (JWKS URL)</p>
              <code className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-600">{backendUrl}/moodle-lti/jwks.json</code>
            </div>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/jwks.json`, 'JWKS URL')}>
              <Copy className="mr-2 size-4" /> Copiar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CanvasInstructions = () => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado com sucesso!`);
  };

  const backendUrl = import.meta.env.VITE_API_URL || 'https://api.certifikedu.com.br';

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <h3 className="mb-2 text-xl font-bold text-blue-900">Integração Canvas LMS (LTI Advantage)</h3>
        <p className="mb-4 text-sm text-slate-600">
          A CertifikEDU suporta a integração baseada no protocolo LTI 1.3 (Advantage). O processo de configuração no Canvas LMS envolve a criação de uma <strong>Developer Key</strong> (LTI Key) e a instalação do app na conta ou curso.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
        <Key className="mt-0.5 size-5 shrink-0" />
        <div className="text-sm">
          <p className="mb-1 font-semibold">Atenção</p>
          <p>
            A configuração de ferramentas LTI 1.3 no Canvas requer acesso de <strong>Administrador de Conta (Account Admin)</strong> 
            para a criação da Developer Key. Depois de criada, os professores podem instalá-la em seus cursos usando o Client ID.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-slate-700">Passo a Passo (Administrador Canvas):</h4>
        <ol className="list-decimal space-y-3 pl-5 text-sm text-slate-600">
          <li>Acesse <strong>Admin &gt; Developer Keys</strong>.</li>
          <li>Clique em <strong>+ Developer Key</strong> e selecione <strong>LTI Key</strong>.</li>
          <li>
            Preencha os campos com as URLs da CertifikEDU:
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li className="flex items-center gap-2">
                <strong>Target Link URI:</strong> <code className="rounded bg-slate-100 px-1">{backendUrl}/moodle-lti/launch</code>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/launch`, 'Target Link URI')}><Copy className="size-3" /></Button>
              </li>
              <li className="flex items-center gap-2">
                <strong>OpenID Connect Initiation Url:</strong> <code className="rounded bg-slate-100 px-1">{backendUrl}/moodle-lti/login</code>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/login`, 'OIDC Login URL')}><Copy className="size-3" /></Button>
              </li>
              <li><strong>JWK Method:</strong> Public JWK URL</li>
              <li className="flex items-center gap-2">
                <strong>Public JWK URL:</strong> <code className="rounded bg-slate-100 px-1">{backendUrl}/moodle-lti/jwks.json</code>
                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => copyToClipboard(`${backendUrl}/moodle-lti/jwks.json`, 'JWKS URL')}><Copy className="size-3" /></Button>
              </li>
            </ul>
          </li>
          <li>Em LTI Advantage Services, habilite os escopos de AGS (Assignment and Grade Services) e Names and Role Provisioning, se desejar.</li>
          <li>Salve e altere o status da chave para <strong>ON</strong>. Copie o número gerado (Client ID).</li>
          <li>No CertifikEDU, insira esse Client ID nas configurações da instituição.</li>
        </ol>
      </div>
    </div>
  );
};

const ApiDocumentation = () => {
  const backendUrl = import.meta.env.VITE_API_URL || 'https://api.certifikedu.com.br';
  
  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <h3 className="mb-2 text-xl font-bold text-blue-900">API CertifikEDU (REST)</h3>
        <p className="mb-4 text-sm text-slate-600">
          Nossa API RESTful permite que sua instituição gerencie cursos, estudantes, matrículas, relatórios e certificados programaticamente. 
          A documentação é baseada em OpenAPI (Swagger) e testável diretamente pelo navegador.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="transition-colors hover:border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="size-5 text-blue-600" />
              Documentação Interativa (Swagger)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>Acesse nossa documentação Swagger para explorar todos os endpoints disponíveis, seus payloads de requisição e respostas, além de poder testá-los ao vivo.</p>
            <a 
              href={`${backendUrl}/api`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full"
            >
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Acessar Swagger API
              </Button>
            </a>
          </CardContent>
        </Card>

        <Card className="transition-colors hover:border-emerald-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download className="size-5 text-emerald-600" />
              Postman Collection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-600">
            <p>Desenvolvedores podem baixar nossa collection do Postman para importar rapidamente todas as rotas no seu ambiente local e acelerar o desenvolvimento.</p>
            <a 
              href="/certifikedu_apis.yaml" 
              download="certifikedu_apis.yaml"
              className="inline-flex w-full"
            >
              <Button variant="outline" className="w-full border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                <FcDownload className="mr-2 size-5" />
                Baixar Collection (.yaml)
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const DocumentationCard = () => {
  return (
    <>
      <Helmet>
        <title>Documentação e Integrações • CertifikEDU</title>
      </Helmet>
      
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Logo path={'images/logo_text.svg'} />
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Central para Desenvolvedores
            </h1>
            <p className="max-w-2xl text-lg text-slate-600">
              Guias de integração LTI para LMS (Moodle, Canvas) e documentação completa da API RESTful da CertifikEDU.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-1 shadow-sm md:p-6">
            <Tabs defaultValue="api" className="w-full">
              <TabsList className="mb-6 grid h-auto w-full grid-cols-1 gap-2 rounded-xl bg-slate-100 p-1 md:grid-cols-3">
                <TabsTrigger value="api" className="py-2.5">API REST (Swagger)</TabsTrigger>
                <TabsTrigger value="moodle" className="py-2.5">Integração Moodle</TabsTrigger>
                <TabsTrigger value="canvas" className="py-2.5">Integração Canvas</TabsTrigger>
              </TabsList>
              
              <div className="p-4 pt-0 md:p-6">
                <TabsContent value="api" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <ApiDocumentation />
                </TabsContent>
                
                <TabsContent value="moodle" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <MoodleInstructions />
                </TabsContent>
                
                <TabsContent value="canvas" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <CanvasInstructions />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default DocumentationCard;
