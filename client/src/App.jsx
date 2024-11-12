import { Route, Routes } from 'react-router-dom'
import './App.css'

import PageColaboradores from './pages/PageColaboradores'
import PageEmpresas from './pages/PageEmpresas'
function App() {


  return (
    <>
      <Routes>
        <Route path="/colaboradores" element={<PageColaboradores />} />
        <Route path="/empresas" element={<PageEmpresas />} />
      </Routes>
    </>
  )
}

export default App
