import { ERole } from './ERole';
import { Role } from './Role';

export class User {
  id: number;
  username: string;
  email: string;
  roles: Role[];

  constructor(id: number, username: string, email: string, roles: Role[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
