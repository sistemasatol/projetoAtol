import { Route, Router, Routes } from 'react-router-dom'
import './App.css'

import PageColaboradores from './pages/PageColaboradores'
import PageEmpresas from './pages/PageEmpresas'
import PageFuncoes from './pages/PageFuncoes'
import { Container } from '@mui/material'
import Sidebar from './components/Sidebar'
function App() {


  return (

    <>
      <Router>
        <Sidebar />
        <Container sx={{ marginLeft: 240 }}>
          <Routes>
            <Route path="/colaboradores" element={<PageColaboradores />} />
            <Route path="/empresas" element={<PageEmpresas />} />
            <Route path="/funcoes" element={<PageFuncoes />} />
          </Routes>
        </Container>
      </Router>
    </>
  )
}

export default App
