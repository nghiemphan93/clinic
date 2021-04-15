import { ERole } from './ERole';

export class User {
  id: number;
  username: string;
  email: string;
  roles: ERole[];

  constructor(id: number, username: string, email: string, roles: ERole[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
