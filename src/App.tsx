import './App.css'

import { RouterProvider } from 'react-router-dom'
import { router } from "./routes"
import { Toaster } from 'sonner'

function App() {

  return (
    <div>
      <RouterProvider router={router} />
      < Toaster richColors/>
    </div>

  )
}

export default App
