import { ERole } from './ERole';

export class JwtResponse {
  token: string;
  type: string = 'Bearer';
  id: number;
  username: string;
  email: string;
  roles: Set<ERole>;

  constructor(
    token: string,
    type: string,
    id: number,
    username: string,
    email: string,
    roles: Set<ERole>
  ) {
    this.token = token;
    this.type = type;
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
