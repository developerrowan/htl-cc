import { User } from '../models/User.model';
import { getLoggedInUser } from '../services/user.service';
import { FormMode } from '../types/FormMode';
import SignupOrEditForm from '../types/SignupOrEditForm';

export function getDefaultFormValues(mode: FormMode): SignupOrEditForm {
  let defaultValues: SignupOrEditForm;

  if (mode === 'edit') {
    const loggedInUser = getLoggedInUser()!;

    defaultValues = {
      email: loggedInUser.email,
      password: loggedInUser.password,
      confirmPassword: loggedInUser.password,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      phoneNumber: loggedInUser.phoneNumber,
      favoriteColor: loggedInUser.favoriteColor,
    };
  } else {
    defaultValues = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      favoriteColor: '',
    };
  }

  return defaultValues;
}

export function transferFormToUserModel(userId: string, values: SignupOrEditForm): User {
  return {
    id: userId,
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    phoneNumber: values.phoneNumber
      ? values.phoneNumber!.replace('(', '').replace(')', '').replace('-', '').replace(/\s/g, '')
      : undefined,
    favoriteColor: values.favoriteColor,
  } as User;
}
