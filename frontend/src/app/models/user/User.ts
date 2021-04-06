import { ERole } from './ERole';

export class User {
  id: number;
  username: string;
  email: string;
  roles: Set<ERole>;

  constructor(id: number, username: string, email: string, roles: Set<ERole>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
