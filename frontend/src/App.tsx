import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <div>Dashboard Page</div>
          </PrivateRoute>
        } />

        <Route path="/transactions" element={
          <PrivateRoute>
            <div>Transactions Page</div>
          </PrivateRoute>
        } />
        <Route path="/categories" element={
          <PrivateRoute>
            <div>Categories Page</div>
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App