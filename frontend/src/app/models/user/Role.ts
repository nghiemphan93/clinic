import { ERole } from './ERole';
import { BaseEntity } from '../base/BaseEntity';

export class Role extends BaseEntity {
  id?: number;
  role!: ERole;
}
