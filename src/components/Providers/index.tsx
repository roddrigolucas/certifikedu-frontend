import { Component, ErrorInfo, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import { AbilitieProvider } from '@/hooks/core/useAbilitie';
import { AuthenticationProvider } from '@/hooks/core/useAuthentication';
import { CertificateProvider } from '@/hooks/core/useCertificate';
import { CertificateProviderPJ } from '@/hooks/core/useCertificatePJ';
import { GalleryProvider } from '@/hooks/core/useGallery';
import { ProfileProvider } from '@/hooks/core/useProfile';
import { ThemeContextProvider } from '@/hooks/core/useTheme';

import FullscreenErrorOverlay from '../core/atoms/FullscreenErrorOverlay';
import MultiContextProvider from './MultiProvider';
import type { ProvidersProps } from './types';

// Simple ErrorBoundary to replace Sentry.ErrorBoundary
class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CertifikEDU] Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const providers = [
  ThemeContextProvider,
  AuthenticationProvider,
  ProfileProvider,
  CertificateProvider,
  AbilitieProvider,
  GalleryProvider,
  CertificateProviderPJ,
];

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MultiContextProvider providers={providers}>
          <ErrorBoundary fallback={<FullscreenErrorOverlay />}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} position="top-right" />
          </ErrorBoundary>
        </MultiContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
