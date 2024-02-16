import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Scrollyline from './scrollyline/Scrollyline';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Scrollyline />,
  },
]);

export function renderToDOM(container) {
  createRoot(container).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
