import { ISignIn } from './signin.interface';

export interface ISignInWithUser extends Request {
  user: ISignIn;
}
