import { Role } from './Role';

export class User {
  id: number = 0;
  username: string;
  email: string;
  roles: Role[];

  constructor(username: string, email: string, roles: Role[]) {
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
