import { useNavigate } from 'react-router-dom';
import { User } from '../models/User.model';
import { logout } from '../services/auth.service';
import { deleteUserById } from '../services/user.service';

export default function DeleteAccountDialog({ user }: { user: User }) {
  const navigate = useNavigate();

  const deleteAccount = () => {
    deleteUserById(user.id);
    logout();
    navigate('/login');
  };

  return (
    <dialog id="deleteModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Are you sure?</h3>
        <p className="py-4">
          If you delete your account, we can&apos;t sell your data anymore :(. Also, this action <b>cannot be undone</b>
          .
        </p>
        <div className="modal-action">
          <a className="btn btn-error" onClick={deleteAccount}>
            Delete account
          </a>
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
