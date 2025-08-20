import './App.css'

import { ThemeProvider } from "./components/theme/theme-provider"
import { RouterProvider } from 'react-router-dom'
import { router } from "./routes"
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme ">
      <div>
        <QueryClientProvider client={queryClient}>  
          <RouterProvider router={router} />
          < Toaster richColors />
         </QueryClientProvider>
      </div>
    </ThemeProvider>
  )
}

export default App
