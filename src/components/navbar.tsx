import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { getLoggedInUser } from '../services/user.service';

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginCheck = setInterval(() => {
      setLoggedIn(getLoggedInUser() !== undefined);
    }, 100);

    return () => {
      clearInterval(loginCheck);
    };
  }, []);

  const signOut = () => {
    // Justttt in case.
    if (!getLoggedInUser()) return;

    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/">
          <a className="btn btn-ghost text-xl">HTL Coding Challenge</a>
        </Link>
      </div>
      {loggedIn && (
        <div className="navbar-end">
          <a className="btn" onClick={signOut}>
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
}
