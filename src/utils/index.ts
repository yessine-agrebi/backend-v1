import { randomBytes } from 'crypto';

const generateRandomPassword = (length: number) => {
  return randomBytes(length).toString('hex');
};

export default generateRandomPassword;
