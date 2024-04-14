import { createRoot } from 'react-dom/client';
import App from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AboutLazy from './pages/about/About.lazy';
import ShopLazy from './pages/shop/Shop.lazy';
import { Suspense } from 'react';

const root = document.getElementById('root');
if (!root) {
  throw new Error('Root is not found');
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          // ! when we are working with lazy components we should wrap them with Suspense
          <Suspense fallback={<p>Loading</p>}>
            <AboutLazy />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          // ! when we are working with lazy components we should wrap them with Suspense
          <Suspense fallback={<p>Loading</p>}>
            <ShopLazy />
          </Suspense>
        ),
      },
    ],
  },
]);

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
