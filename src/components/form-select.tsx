import clsx from 'clsx';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { SelectOption } from '../types/SelectOption';

type Props = {
  options: SelectOption[];
  required?: boolean;
  formRegisterReturn: UseFormRegisterReturn<string>;
  error: FieldError | undefined;
  label: string;
};

export default function FormSelect(props: Props) {
  return (
    <label className="form-control w-full max-w-xs mb-4">
      <select className={clsx('select select-bordered', props.error && 'select-error')} {...props.formRegisterReturn}>
        <option value="" disabled selected>
          {props.label}
        </option>
        {props.options.map((option, i) => (
          <option value={option.value} key={i}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="label">
        <span className="label-text-alt text-red-600">{props.error?.message || ''}</span>
      </div>
    </label>
  );
}
