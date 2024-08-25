import { IUserWithoutPassword } from '../../user/entities/reponse/user-without-password.response';

export function removeUserPassword(user): IUserWithoutPassword {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
