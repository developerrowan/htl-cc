import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteAccountDialog from '../components/delete-account-modal';
import { User } from '../models/User.model';
import { getLoggedInUser } from '../services/user.service';
import { getFormattedPhoneNumber } from '../utils/phone-formatting-helpers';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();

    // This shouldn't be possible, but just in case.
    if (!loggedInUser) navigate('/login');

    setUser(loggedInUser!);
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center text-center">
      <p className="text-4xl mb-8" style={{ color: user.favoriteColor }}>
        {user.firstName} {user.lastName} Profile
      </p>
      <Link to="/settings">
        <a className="btn btn-success mb-4">Edit Profile</a>
      </Link>
      <p className="text-3xl mb-2">We take your security seriously.</p>
      <p className="text-3xl mb-4">So here&apos;s your password, that way you don&apos;t forget it!</p>
      <p className="text-4xl mb-8">
        <b>{user.password}</b>
      </p>
      <p className="text-3xl mb-4">
        Email: <b>{user.email}</b>{' '}
        <span className="text-sm">
          (we probably <i>will</i> spam you, sorry)
        </span>
      </p>
      {user.phoneNumber && (
        <p className="text-3xl mb-4">
          Phone: <b>{getFormattedPhoneNumber(user.phoneNumber)}</b>
        </p>
      )}
      <p className="text-3xl mb-12">
        Your favorite color is <span style={{ color: user.favoriteColor }}>{user.favoriteColor}</span>.
      </p>
      <p className="text-3xl mb-4">
        <b>
          <i>Concerned about the security of your account for some strange reason?</i>
        </b>
      </p>
      <a className="btn btn-error" onClick={() => document!.getElementById('deleteModal')!.showModal()}>
        Delete Account
      </a>
      <DeleteAccountDialog user={user} />
    </div>
  );
}
