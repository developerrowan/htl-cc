import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../models/User.model';
import { login } from './auth.service';
import { getAllUsers, getLoggedInUser, getUserByEmail, getUserById } from './user.service';

const TEST_USER = {
  id: 'wow',
  firstName: 'Special',
  lastName: 'User',
  email: 'a@a.com',
  password: 'aP455W0rD!',
  phoneNumber: undefined,
  favoriteColor: 'black',
} as User;

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('users', JSON.stringify([TEST_USER]));
});

describe('User service', () => {
  describe('getAllUsers', () => {
    it('should return all users within the users field in localStorage', () => {
      // Arrange / Act
      const users = getAllUsers();

      // Assert
      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('getUserByEmail', () => {
    it('should return a user which has a email, who exists within the users field in localStorage', () => {
      // Arrange / Act
      const user = getUserByEmail(TEST_USER.email);

      // Assert
      expect(user).toBeTruthy();
      expect(user?.id).toEqual(TEST_USER.id);
    });

    it('should return undefined when a user with a specified email does not exist in localStorage', () => {
      // Arrange / Act
      const user = getUserByEmail('where@ami.com');

      // Assert
      expect(user).toBeUndefined();
    });
  });

  describe('getUserById', () => {
    it('should return a user which has a specific ID, who exists within the users field in localStorage', () => {
      // Arrange / Act
      const user = getUserById(TEST_USER.id);

      // Assert
      expect(user).toBeTruthy();
      expect(user?.email).toEqual(TEST_USER.email);
    });

    it('should return undefined when a user with a specified ID does not exist in localStorage', () => {
      // Arrange / Act
      const user = getUserById('beepboop');

      // Assert
      expect(user).toBeUndefined();
    });
  });

  describe('getLoggedInUser', () => {
    it('should return a user if one is logged in', () => {
      // Arrange
      login(TEST_USER.id);

      // Act
      const user = getLoggedInUser();

      // Assert
      expect(user).toBeTruthy();
      expect(user?.id).toEqual(TEST_USER.id);
    });

    it('should return undefined when no user is logged in', () => {
      // Arrange / Act
      const user = getLoggedInUser();

      // Assert
      expect(user).toBeUndefined();
    });
  });

  // For brevity, I end tests here. I wanted to do spies and mocking, but I'm unsure if that's overkill here...
});
