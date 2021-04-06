export class BaseEntity {
  id: number;
  createdAt: Date;

  constructor(id: number, createdAt: Date) {
    this.id = id;
    this.createdAt = createdAt;
  }
}
