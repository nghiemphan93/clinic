import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/User';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BasePage } from '../../../models/base/BasePage';
import { UserSearchCriteria } from '../../../models/user/UserSearchCriteria';
import { SortEDirection } from '../../../models/base/SortEDirection';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  users: User[] = [];
  searchValue = '';
  visible = false;
  @ViewChild('searchInput') searchInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadDataFromServer(page?: BasePage, userSearchCriteria?: UserSearchCriteria) {
    this.loading = true;
    this.subscription.add(
      this.userService.getAll(page, userSearchCriteria).subscribe((data) => {
        this.loading = false;
        this.total = data.totalElements;
        this.users = data.content;
      })
    );
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortBy = (currentSort && currentSort.key) || 'createdAt';
    const sortDirection = (currentSort && currentSort.value) || 'ascend';

    const page: BasePage = {
      pageNumber: pageIndex - 1,
      pageSize: pageSize,
      sortDirection:
        sortDirection === 'ascend' ? SortEDirection.ASC : SortEDirection.DESC,
      sortBy: sortBy,
    };

    const searchCriteria: UserSearchCriteria = {
      username: this.searchValue,
    };

    this.loadDataFromServer(page, searchCriteria);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;

    const page: BasePage = new BasePage();

    const searchCriteria: UserSearchCriteria = {
      username: this.searchValue,
    };

    this.loadDataFromServer(page, searchCriteria);
  }

  focusOnSearchInput() {
    this.searchInput?.nativeElement.focus();
  }
}
