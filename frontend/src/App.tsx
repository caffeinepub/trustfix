import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

// Services list route (with optional category search param)
const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: Services,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      category: typeof search.category === 'string' ? search.category : undefined,
    } as { category?: string };
  },
});

// Legacy route kept for any existing deep links
const servicesDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$serviceId',
  component: Services,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: Booking,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reviews',
  component: Reviews,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  servicesRoute,
  servicesDetailRoute,
  bookingRoute,
  contactRoute,
  reviewsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
