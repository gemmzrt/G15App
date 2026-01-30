import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ui';
import { EnvErrorScreen } from '@/lib/env';
import { AppRouter } from './router';
import { logger } from '@/lib/logger';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
  },
});

export function App() {
  try {
    logger.info('app_mounted');

    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </BrowserRouter>
      </QueryClientProvider>
    );
  } catch (error) {
    if (error instanceof Error && error.name === 'EnvError') {
      return <EnvErrorScreen error={error as any} />;
    }
    throw error;
  }
}
