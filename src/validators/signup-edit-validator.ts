import { z } from 'zod';
import { getUserByEmail } from '../services/user.service';
import { FormMode } from '../types/FormMode';

export default function getSignupEditValidationSchema(formMode: FormMode) {
  return z
    .object({
      email: z
        .string()
        .email('Please enter a valid email.')
        .superRefine((email, uniqueEmail) => {
          // This 100% needs to be rate-limited in the real world. No brute forcing for me please.
          if (getUserByEmail(email) && formMode === 'signup')
            uniqueEmail.addIssue({
              code: 'custom',
              message: 'This email is already in use.',
            });
        }),
      confirmPassword: z.string(),
      password: z
        .string()
        .min(10, 'Password should be a minimum of 10 characters.')
        .max(32, 'Password length may not exceed 32 characters.')
        .superRefine((password, checkPasswordStrength) => {
          const hasUppercase = (character: string) => /[A-Z]/.test(character);
          const hasSpecial = (character: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(character);

          let upperCaseCount = 0,
            numberCount = 0,
            specialCharacterCount = 0;

          for (let i = 0; i < password.length; i++) {
            const character = password.charAt(i);
            if (!isNaN(+character)) numberCount++;
            else if (hasUppercase(character)) upperCaseCount++;
            else if (hasSpecial(character)) specialCharacterCount++;
          }

          // This provides a poor user experience and frustrates them. A real implementation should not use an if-else-if chain.
          if (numberCount < 2)
            checkPasswordStrength.addIssue({
              code: 'custom',
              message: 'Password must contain at least 2 numbers.',
            });
          else if (upperCaseCount < 2)
            checkPasswordStrength.addIssue({
              code: 'custom',
              message: 'Password must contain at least 2 uppercase characters.',
            });
          else if (specialCharacterCount === 0)
            checkPasswordStrength.addIssue({
              code: 'custom',
              message: 'Password must contain at least 1 special character.',
            });
        }),
      firstName: z.string().min(3, 'First name must contain a minimum of three characters.'),
      lastName: z.string().min(3, 'Last name must contain a minimum of three characters.'),
      phoneNumber: z
        .string()
        .superRefine((phoneNumber, checkPhoneNumber) => {
          const strippedNumber = phoneNumber.replace('(', '').replace(')', '').replace('-', '').replace(/\s/g, '');

          if (!strippedNumber.match(/^\+[1-9]\d{10,14}$/))
            checkPhoneNumber.addIssue({
              code: 'custom',
              message: 'Please enter a valid phone number.',
            });
        })
        .optional()
        .or(z.literal('')),
      favoriteColor: z.string().min(1, 'Please select your favorite color.'),
    })
    .refine((values) => values.confirmPassword === values.password, {
      code: 'custom',
      path: ['confirmPassword'],
      message: 'Passwords do not match.',
    });
}
