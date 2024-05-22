import { Color } from './Color';

export default interface SignupOrEditForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  favoriteColor: Color;
}
