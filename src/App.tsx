import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import AuthGuard from './pages/AuthGuard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignupOrEditProfile from './pages/SignupOrEditProfile';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen min-w-screen">
        <Navbar />
        <div className="flex flex-1 min-w-screen">
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <SignupOrEditProfile mode="edit" />
                </AuthGuard>
              }
            />
            <Route path="/signup" element={<SignupOrEditProfile mode="signup" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
