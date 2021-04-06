import { ERole } from './ERole';

export class SignUpRequest {
  username: string;
  email: string;
  roles: Set<ERole>;
  password: string;

  constructor(
    username: string,
    email: string,
    roles: Set<ERole>,
    password: string
  ) {
    this.username = username;
    this.email = email;
    this.roles = roles;
    this.password = password;
  }
}
