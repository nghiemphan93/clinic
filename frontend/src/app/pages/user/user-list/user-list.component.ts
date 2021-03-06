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
import { DeviceDetectorService } from 'ngx-device-detector';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  currentPage = 1;
  totalPages!: number;
  isMobile!: boolean;
  isLoading = false;

  constructor(
    private userService: UserService,
    private messageService: NzMessageService,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit(): void {
    this.loadDataFromServer();
  }

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
        this.totalPages = data.totalPages;
        this.currentPage = this.currentPage;
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

  async delete(id: number | undefined) {
    if (id) {
      try {
        this.isLoading = true;
        await this.userService.delete(id).toPromise();
        this.messageService.success('deleted!!!');
        this.users = [...this.users.filter((user) => user.id !== id)];
      } catch (e) {
        this.messageService.error(e.message);
      } finally {
        this.isLoading = false;
      }
    }
  }

  stopPropagation($event: MouseEvent) {
    $event.stopPropagation();
  }

  onChosenPage(currentPage: number) {
    const page: BasePage = {
      pageNumber: currentPage - 1,
      pageSize: this.pageSize,
    };
    this.loadDataFromServer(page);
  }
}
