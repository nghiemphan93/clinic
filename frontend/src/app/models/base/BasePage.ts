import { SortEDirection } from './SortEDirection';

export class BasePage {
  pageNumber?: number;
  pageSize?: number;
  sortDirection?: SortEDirection;
  sortBy?: string;
}
