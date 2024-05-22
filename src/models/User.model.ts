import { Color } from '../types/Color';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  favoriteColor: Color;
}
