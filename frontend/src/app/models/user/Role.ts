import { ERole } from './ERole';

export class Role {
  id: number;
  role: ERole;

  constructor(id: number, role: ERole) {
    this.id = id;
    this.role = role;
  }
}
