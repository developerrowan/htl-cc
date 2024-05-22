import { zodResolver } from '@hookform/resolvers/zod';
import { CircleUserIcon, KeyRoundIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useHookFormMask } from 'use-mask-input';
import { v4 } from 'uuid';
import FormInput from '../components/form-input';
import FormSelect from '../components/form-select';
import { login } from '../services/auth.service';
import { getLoggedInUser, insertUser, updateUserById } from '../services/user.service';
import { colorOptions } from '../types/Color';
import { FormMode } from '../types/FormMode';
import SignupOrEditForm from '../types/SignupOrEditForm';
import { getDefaultFormValues, transferFormToUserModel } from '../utils/signup-edit-helpers';
import getSignupEditValidationSchema from '../validators/signup-edit-validator';

export default function SignupOrEditProfile({ mode }: { mode: FormMode }) {
  const navigate = useNavigate();

  const defaultValues = getDefaultFormValues(mode);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(getSignupEditValidationSchema(mode)), mode: 'onTouched' });
  const registerWithMask = useHookFormMask(register);

  const onSubmit = (values: SignupOrEditForm) => {
    if (mode === 'signup') {
      const newUserId = v4();

      insertUser(transferFormToUserModel(newUserId, values));
      login(newUserId);
    } else {
      const loggedInUser = getLoggedInUser()!;
      const userId = loggedInUser.id;

      updateUserById(userId, transferFormToUserModel(userId, values));
    }

    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <p className="text-4xl mb-8">
        {mode === 'edit' ? (
          <span style={{ color: defaultValues.favoriteColor }}>
            Edit {defaultValues.firstName} {defaultValues.lastName} Profile
          </span>
        ) : (
          'Sign up'
        )}
      </p>
      <form id="loginForm" className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="text"
          placeholder="First Name"
          icon={<CircleUserIcon />}
          formRegisterReturn={{ ...register('firstName') }}
          error={errors.firstName}
        />
        <FormInput
          type="text"
          placeholder="Last Name"
          icon={<CircleUserIcon />}
          formRegisterReturn={{ ...register('lastName') }}
          error={errors.lastName}
        />
        <FormInput
          type="email"
          placeholder="Email"
          icon={<MailIcon />}
          formRegisterReturn={{ ...register('email') }}
          error={errors.email}
        />
        <FormInput
          optional
          type="tel"
          mask="+9 (999) 999-9999"
          placeholder="Phone"
          icon={<PhoneIcon />}
          formRegisterReturn={{
            ...registerWithMask('phoneNumber', ['+9 (999) 999-9999', '+99 (999) 999-9999', '+999 (999) 999-9999'], {
              required: true,
            }),
          }}
          error={errors.phoneNumber}
        />
        <FormInput
          type="password"
          placeholder="Password"
          icon={<KeyRoundIcon />}
          formRegisterReturn={{ ...register('password') }}
          error={errors.password}
        />
        <FormInput
          type="password"
          placeholder="Confirm Password"
          icon={<KeyRoundIcon />}
          formRegisterReturn={{ ...register('confirmPassword') }}
          error={errors.confirmPassword}
        />
        <FormSelect
          options={colorOptions}
          formRegisterReturn={{ ...register('favoriteColor') }}
          error={errors.favoriteColor}
          label="Select your favorite color"
        />
        <button className="btn btn-primary" type="submit">
          {mode === 'edit' ? 'Edit profile' : 'Sign up'}
        </button>
      </form>
      {mode === 'edit' ? (
        <Link to="/">
          <button className="btn btn-error mt-8">Cancel</button>
        </Link>
      ) : (
        <>
          <p className="text-3xl mb-4 mt-8">Already have an account?</p>

          <Link to="/login">
            <button className="btn btn-secondary">Login</button>
          </Link>
        </>
      )}
    </div>
  );
}
