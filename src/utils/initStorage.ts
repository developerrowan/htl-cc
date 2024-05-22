export default function initStorage() {
  // Initializing the users list in case it does not exist.
  if (localStorage.getItem('users') === null) localStorage.setItem('users', '[]');

  // Creating the logged in user key in case it does not exist.
  if (localStorage.getItem('currentUserId') === null) localStorage.setItem('currentUserId', '');

  // Creating the auth expiration epoch key in case it does not exist.
  if (localStorage.getItem('currentUserId') === null) localStorage.setItem('authExpirationEpoch', '');
}
