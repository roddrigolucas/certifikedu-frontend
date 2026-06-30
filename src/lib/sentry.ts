// Sentry configuration removed — using console logging instead
// Exports are aliases for react-router-dom equivalents

import { createBrowserRouter, Routes } from 'react-router-dom';

console.log('[CertifikEDU] Sentry disabled (local development)');

// SentryRoutes is just plain Routes without Sentry wrapping
export const SentryRoutes = Routes;

// SentryCreateBrowserRouter is just plain createBrowserRouter
export const SentryCreateBrowserRouter = createBrowserRouter;
