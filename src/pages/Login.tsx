import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, KeyRoundIcon, MailIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormInput from '../components/form-input';
import { isPasswordCorrect, login } from '../services/auth.service';
import { getLoggedInUser, getUserByEmail } from '../services/user.service';
import getLoginValidationSchema from '../validators/login-validator';
export interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showGenericError, setShowGenericError] = useState(false);

  const defaultValues: LoginForm = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(getLoginValidationSchema()), mode: 'onTouched' });

  useEffect(() => {
    if (getLoggedInUser()) {
      navigate('/');
    }
  }, []);

  const onSubmit = (values: LoginForm) => {
    const user = getUserByEmail(values.email);

    if (!user || !isPasswordCorrect(user, values.password)) {
      setShowGenericError(true);
      return;
    }

    login(user.id);
    navigate('/');
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      {state?.authExpired && (
        <div role="alert" className="alert alert-warning w-auto mb-4">
          <AlertTriangle />
          <span>Session timed out.</span>
        </div>
      )}
      <p className="text-4xl mb-8">Login</p>
      <form id="loginForm" className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="email"
          placeholder="Email"
          icon={<MailIcon />}
          formRegisterReturn={{ ...register('email') }}
          error={errors.email}
          testId="email-input"
        />
        <FormInput
          type="password"
          placeholder="Password"
          icon={<KeyRoundIcon />}
          formRegisterReturn={{ ...register('password') }}
          error={errors.password}
          data-testid="password-input"
        />
        <button className="btn btn-primary" type="submit" data-testid="login-button">
          Login
        </button>
        {showGenericError && (
          <p className="text-lg text-red-600 mb-8" data-testid="login-incorrect-credentials">
            Email or password is incorrect.
          </p>
        )}
      </form>
      <p className="text-3xl mb-4 mt-8">No account?</p>
      <Link to="/signup">
        <button className="btn btn-secondary">Sign up now</button>
      </Link>
    </div>
  );
}
