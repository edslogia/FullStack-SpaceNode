import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { MainLayout } from './app/layouts'

// Configuración temporal del router
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-slate-200 mb-4">
                SpaceNode
              </h1>
              <p className="text-slate-400">
                Landing Page - En construcción
              </p>
            </div>
          </div>
        ),
      },
      {
        path: '/login',
        element: (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-200 mb-4">
                Login
              </h1>
              <p className="text-slate-400">
                Página de login - Pendiente
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
