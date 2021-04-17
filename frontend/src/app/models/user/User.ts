import { Role } from './Role';
import { BaseEntity } from '../base/BaseEntity';

export class User extends BaseEntity {
  username?: string;
  email?: string;
  roles?: Role[];
}
