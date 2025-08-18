import './App.css'

import { ThemeProvider } from "./components/theme/theme-provider"
import { RouterProvider } from 'react-router-dom'
import { router } from "./routes"
import { Toaster } from 'sonner'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="pizzashop-theme ">
      <div>
        <RouterProvider router={router} />
        < Toaster richColors />
      </div>
    </ThemeProvider>
  )
}

export default App
