import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { getLoggedInUser } from '../services/user.service';

// An auth guard, which enforces both redirecting to the login page if not logged in, and the timeout functionality.
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getLoggedInUser()) {
      navigate('/login');
    }

    // Will log out the user when the current unix epoch succeeds the stored one.
    const authExpirationEpoch = localStorage.getItem('authExpirationEpoch');
    let expirationCheck: number;

    if (authExpirationEpoch) {
      expirationCheck = setInterval(() => {
        if (Date.now() >= +authExpirationEpoch) {
          logout();
          navigate('/login', { state: { authExpired: true } });
        }
      }, 1000);
    }

    return () => {
      if (expirationCheck) clearInterval(expirationCheck);
    };
  }, []);

  return <>{children}</>;
}
