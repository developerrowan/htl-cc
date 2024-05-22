import clsx from 'clsx';
import { HTMLInputTypeAttribute } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  icon?: React.ReactNode;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  optional?: boolean;
  placeholder: string;
  formRegisterReturn: UseFormRegisterReturn<string>;
  error: FieldError | undefined;
  mask?: string;
  testId?: string;
};

export default function FormInput(props: Props) {
  return (
    <label className="form-control w-full max-w-xs mb-4">
      {props.optional && (
        <div className="label">
          <span className="label-text-alt text-red-600">* Optional</span>
        </div>
      )}
      <label className={clsx('input input-bordered flex items-center', props.error && 'input-error')}>
        {props.icon && <>{props.icon}</>}
        <input
          type={props.type}
          className="grow"
          placeholder={props.placeholder}
          {...props.formRegisterReturn}
          data-testid={props.testId || `${props.type}-input`}
        />
      </label>
      <div className="label">
        <span className="label-text-alt text-red-600">{props.error?.message || ''}</span>
      </div>
    </label>
  );
}
