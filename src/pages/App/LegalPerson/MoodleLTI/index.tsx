import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { MonitorDotIcon } from 'lucide-react';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';
import { Label } from '@/components/shared/ui/label';

import { authApi } from '@/services/api/api';

const fetchConfig = async () => {
  const { data } = await authApi.get('/moodle-lti/config');
  return data;
};

const updateConfig = async (configData: any) => {
  const { data } = await authApi.post('/moodle-lti/config', configData);
  return data;
};

export const MoodleLtiConfigPage = () => {
  const [formData, setFormData] = useState({
    clientId: '',
    deploymentId: '',
    issuer: '',
    authUrl: '',
    tokenUrl: '',
    jwksUrl: '',
  });

  const { isLoading } = useQuery(['moodleLtiConfig'], fetchConfig, {
    onSuccess: (data) => {
      if (data && data.clientId) {
        setFormData({
          clientId: data.clientId || '',
          deploymentId: data.deploymentId || '',
          issuer: data.issuer || '',
          authUrl: data.authUrl || '',
          tokenUrl: data.tokenUrl || '',
          jwksUrl: data.jwksUrl || '',
        });
      }
    },
  });

  const { mutate, isLoading: isSaving } = useMutation(updateConfig, {
    onSuccess: () => {
      toast.success('Configurações do Moodle LTI salvas com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao salvar as configurações.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isLoading) {
    return (
      <ApplicationLayout icon={MonitorDotIcon} title="Integração Moodle LTI 1.3" hideCredits>
        <div>Carregando...</div>
      </ApplicationLayout>
    );
  }

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://api.certifikedu.com.br';

  return (
    <ApplicationLayout icon={MonitorDotIcon} title="Integração Moodle LTI 1.3" hideCredits>
      <div className="flex w-full flex-col gap-6 px-4 py-8 md:px-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Configuração Moodle LTI 1.3</h1>
          <p className="text-muted-foreground">
            Configure as credenciais do seu Moodle para habilitar a integração.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Credenciais da Plataforma (Moodle)</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="issuer">URL do Moodle (Issuer)</Label>
              <Input
                id="issuer"
                name="issuer"
                placeholder="https://moodle.instituicao.edu.br"
                value={formData.issuer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="deploymentId">Deployment ID</Label>
              <Input
                id="deploymentId"
                name="deploymentId"
                value={formData.deploymentId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="authUrl">URL de Autenticação (OIDC Auth)</Label>
              <Input
                id="authUrl"
                name="authUrl"
                placeholder="Opcional: https://moodle.instituicao.edu.br/mod/lti/auth.php"
                value={formData.authUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="tokenUrl">URL do Token (Access Token)</Label>
              <Input
                id="tokenUrl"
                name="tokenUrl"
                placeholder="Opcional: https://moodle.instituicao.edu.br/mod/lti/token.php"
                value={formData.tokenUrl}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="jwksUrl">URL do JWKS da Plataforma</Label>
              <Input
                id="jwksUrl"
                name="jwksUrl"
                placeholder="Opcional: https://moodle.instituicao.edu.br/mod/lti/certs.php"
                value={formData.jwksUrl}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" isLoading={isSaving} className="mt-4">
              Salvar Configurações
            </Button>
          </form>

          <div className="flex flex-col gap-4 rounded-xl border p-6 shadow-sm bg-muted/20">
            <h2 className="text-lg font-semibold">Configurações para inserir no Moodle</h2>
            <p className="text-sm text-muted-foreground">
              Utilize as URLs abaixo para cadastrar a CertifikEDU como LTI Tool Provider no seu ambiente Moodle.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <Label className="font-bold">Tool URL (Launch URL)</Label>
                <div className="mt-1 select-all rounded-md bg-muted p-2 font-mono text-sm">
                  {backendUrl}/moodle-lti/launch
                </div>
              </div>
              <div>
                <Label className="font-bold">Initiate Login URL (OIDC Init)</Label>
                <div className="mt-1 select-all rounded-md bg-muted p-2 font-mono text-sm">
                  {backendUrl}/moodle-lti/login
                </div>
              </div>
              <div>
                <Label className="font-bold">Public Keyset (JWKS URL)</Label>
                <div className="mt-1 select-all rounded-md bg-muted p-2 font-mono text-sm">
                  {backendUrl}/moodle-lti/jwks.json
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApplicationLayout>
  );
};
