import { createRoot } from 'react-dom/client';

import './index.css';

import { Toaster } from 'sonner';

import { Application } from './app';
import { Providers } from './components/Providers';

import '@/lib/amplify';
import '@/lib/sentry';

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <Providers>
    <Application />
    <Toaster richColors />
  </Providers>,
);
