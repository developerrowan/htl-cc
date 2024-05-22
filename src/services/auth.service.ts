import { User } from '../models/User.model';

export function login(userId: string): void {
  localStorage.setItem('currentUserId', userId);
  localStorage.setItem('authExpirationEpoch', (Date.now() + 60 * 1000).toString());
}

export function logout() {
  localStorage.setItem('currentUserId', '');
  localStorage.setItem('authExpirationEpoch', '');
}

export function isPasswordCorrect(user: User, suppliedPassword: string): boolean {
  // Usually this is where you'd check against a salted hash or the like. You get the gist...
  return user.password === suppliedPassword;
}
