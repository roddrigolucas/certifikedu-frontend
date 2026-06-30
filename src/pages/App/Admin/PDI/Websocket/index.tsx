import React, { useEffect, useRef, useState } from 'react';

import { PowerOff, TrainFront, Trash2Icon } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import stripAnsi from 'strip-ansi';

import { ApplicationLayout } from '@/components/layouts/app';
import { Button } from '@/components/shared/ui/button';
import { Input } from '@/components/shared/ui/input';
import { Label } from '@/components/shared/ui/label';
import { Textarea } from '@/components/shared/ui/textarea';

import { PDIService } from '@/services/entities/app/core/pdi';

interface UserData {
  learning_goal: string;
  learning_topics: string;
  previousEducation: string;
  daily_time: string;
  run_number: number;
}

const WebSocketComponent: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [id, setId] = useState('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [userData, setUserData] = useState<UserData>({
    learning_goal: '',
    learning_topics: '',
    previousEducation: '',
    daily_time: '',
    run_number: 1,
  });
  const ws = useRef<WebSocket | null>(null);

  async function getToken() {
    const response = PDIService.GetAutheticatedToken();

    return response;
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const path = location.hostname.replace('app', 'ai');
    setIsConnected(true);
    const token = await getToken();
    if (!token) {
      toast.error('No token');
    }

    let connectionString;
    const stringParams = `token=${token.token}&learning_topics=${userData.learning_topics}&learning_goal=${userData.learning_goal}&previousEducation=${userData.previousEducation}&daily_time=${userData.daily_time}&number_of_runs=${userData.run_number}`;
    if (path.includes('localhost')) {
      const localConnection = 'localhost:8008';
      connectionString = `ws://${localConnection}/train?${stringParams}`;
    } else {
      connectionString = `wss://${path}/train?${stringParams}`;
    }

    ws.current = new WebSocket(connectionString);

    ws.current.onopen = () => {
      toast.success('Connected to WebSocket');
    };

    ws.current.onmessage = (event) => {
      toast.success('Message from WebSocket:');
      const data = JSON.parse(event.data);
      setId(data.id);
      setMessages((prev) => [...prev, data.output]);
    };

    ws.current.onerror = (error: any) => {
      setIsConnected(false);
      toast.error('WebSocket error:', error);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      toast.warning('WebSocket connection closed');
    };
  };

  const sendMessage = () => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const data = {
        message: inputMessage,
        id,
      };

      ws.current.send(JSON.stringify(data));
      toast.success('Data sent to WebSocket:');
      setMessages((prev) => [...prev, 'waiting...']);
      setInputMessage('');
    } else {
      console.error('WebSocket is not open. Unable to send data.');
    }
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return (
    <ApplicationLayout icon={TrainFront} title="Treinar modelo do PDI">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold">Interação com o Websocket para treinar o modelo de PDI</h2>
        <Button
          onClick={() => ws.current?.close()}
          disabled={!ws.current || ws.current.readyState !== WebSocket.OPEN}
          variant="destructive"
          type="button"
        >
          <div className="flex items-center gap-2">
            <PowerOff />
            Desconectar
          </div>
        </Button>
      </div>
      {/* User Input Form */}
      <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
        <Label>Learning Goal</Label>
        <Input
          type="text"
          value={userData.learning_goal}
          onChange={(e) => setUserData({ ...userData, learning_goal: e.target.value })}
          placeholder="Learning Goal"
        />
        <Label>Learning Topics</Label>
        <Input
          type="text"
          value={userData.learning_topics}
          onChange={(e) => setUserData({ ...userData, learning_topics: e.target.value })}
          placeholder="Learning Topics"
        />
        <Label>Previous Education</Label>
        <Input
          type="text"
          value={userData.previousEducation}
          onChange={(e) => setUserData({ ...userData, previousEducation: e.target.value })}
          placeholder="Previous Education"
        />
        <Label>Daily Time</Label>
        <Input
          type="text"
          value={userData.daily_time}
          onChange={(e) => setUserData({ ...userData, daily_time: e.target.value })}
          placeholder="Daily Time"
        />
        <Label>Number of runs</Label>
        <Input
          type="number"
          value={userData.run_number}
          onChange={(e) => setUserData({ ...userData, run_number: parseInt(e.target.value) })}
          placeholder="Number of runs"
        />
        <Button isLoading={isConnected} disabled={isConnected} variant="success" type="submit">
          {!isConnected ? 'Iniciar Treinamento' : 'Conexão Estabelecida'}
        </Button>
      </form>
      <div className="relative">
        <Label>Etapas do PDI</Label>
        <div id="messages" className="container h-80 overflow-auto rounded-lg border-2">
          {messages.map((msg, index) => (
            <Markdown key={index} remarkPlugins={[remarkGfm]}>
              {stripAnsi(msg)}
            </Markdown>
          ))}
        </div>
        <div className="absolute right-0 top-6">
          <Button
            onClick={() => setMessages([])}
            disabled={messages.length === 0}
            variant="destructive"
            type="button"
          >
            <div className="flex items-center gap-2">
              <Trash2Icon />
              Limpar
            </div>
          </Button>
        </div>
      </div>

      <div>
        <Label>Escreva o feedback para o resultado gerado</Label>
        <Textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message here"
          className="h-28 rounded-lg border-4"
          disabled={!ws.current || ws.current.readyState !== WebSocket.OPEN}
        />
        <Button
          className="ml-auto mt-4 flex"
          variant="secondary"
          onClick={sendMessage}
          disabled={!ws.current || ws.current.readyState !== WebSocket.OPEN}
        >
          Responder feedback
        </Button>
      </div>
    </ApplicationLayout>
  );
};

export default WebSocketComponent;
