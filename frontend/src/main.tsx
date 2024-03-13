import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './global.css';
import AppRoutes from './AppRoutes';
import Auth0ProviderWithNavigate from './auth/Auth0ProviderWithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from './components/ui/sonner';
import LoaderAnimation from './components/LoaderAnimation';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // TODO will set true on production mode
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
				<Auth0ProviderWithNavigate>
					<AppRoutes />
					{/* <LoaderAnimation /> */}
					<Toaster visibleToasts={1} position='top-right' richColors />
				</Auth0ProviderWithNavigate>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>,
);
