import { ERole } from './ERole';

export class Role {
  id: number = 0;
  role: ERole;

  constructor(role: ERole) {
    this.role = role;
  }
}
