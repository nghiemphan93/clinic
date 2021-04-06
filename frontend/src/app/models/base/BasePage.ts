import { SortEDirection } from './SortEDirection';

export class BasePage {
  pageNumber: number;
  pageSize: number;
  sortDirection: SortEDirection;
  sortBy: string;

  constructor(
    pageNumber: number = 0,
    pageSize: number = 10,
    sortDirection: SortEDirection = SortEDirection.ASC,
    sortBy: string = 'createdAt'
  ) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortBy = sortBy;
  }
}
