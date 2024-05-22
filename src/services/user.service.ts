import { User } from '../models/User.model';

export function getAllUsers(): User[] {
  return JSON.parse(localStorage.getItem('users')!) as User[];
}

export function getUserByEmail(email: string): User | undefined {
  const profiles = getAllUsers();

  return profiles.find((profile) => profile.email === email);
}

export function getUserById(id: string): User | undefined {
  const profiles = getAllUsers();

  return profiles.find((profile) => profile.id === id);
}

export function getLoggedInUser(): User | undefined {
  const loggedInUserId = localStorage.getItem('currentUserId');

  if (loggedInUserId === null || loggedInUserId === '') return undefined;

  return getUserById(loggedInUserId);
}

export function updateAllUsers(users: User[]): void {
  const stringifiedUsers = JSON.stringify(users);

  localStorage.setItem('users', stringifiedUsers);
}

export function insertUser(userModel: User): void {
  const users = getAllUsers();

  // Updating the users in an immutable fashion.
  const updatedUsers = [...users, userModel];

  updateAllUsers(updatedUsers);
}

export function deleteUserById(userId: string): void {
  const users = getAllUsers();

  const otherUsers = users.filter((user) => user.id !== userId);

  updateAllUsers(otherUsers);
}

export function updateUserById(userId: string, userModel: User): void {
  const users = getAllUsers();

  // Get all the other users, so we can add the user in an immutable fashion.
  const otherUsers = users.filter((user) => user.id !== userId);
  const updatedUsers = [...otherUsers, userModel];

  updateAllUsers(updatedUsers);
}
