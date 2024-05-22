import { parsePhoneNumber } from 'libphonenumber-js';

export function getFormattedPhoneNumber(phoneNumber: string): string {
  const parsedNumber = parsePhoneNumber(phoneNumber);

  if (!parsedNumber) return phoneNumber;

  return `+${parsedNumber.countryCallingCode} ${parsedNumber.formatNational()}`;
}
