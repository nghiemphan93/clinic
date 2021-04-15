import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/User';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BasePage } from '../../../models/base/BasePage';
import { UserSearchCriteria } from '../../../models/user/UserSearchCriteria';
import { SortEDirection } from '../../../models/base/SortEDirection';
import { ERole } from '../../../models/user/ERole';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  total = 1;
  pageSize = 10;
  pageIndex = 1;
  loading = true;
  users: User[] = [];
  filterRole = [
    { text: 'MANAGER', value: ERole.ROLE_MANAGER },
    { text: 'DOCTOR', value: ERole.ROLE_DOCTOR },
    { text: 'NURSE', value: ERole.ROLE_NURSE },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadDataFromServer();
  }

  loadDataFromServer(page?: BasePage, userSearchCriteria?: UserSearchCriteria) {
    this.loading = true;
    this.userService.getAll(page, userSearchCriteria).subscribe((data) => {
      this.loading = false;
      this.total = data.totalElements;
      this.users = data.content;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortBy = (currentSort && currentSort.key) || 'createdAt';
    const sortDirection = (currentSort && currentSort.value) || 'ascend';

    this.loadDataFromServer(
      new BasePage(
        pageIndex - 1,
        pageSize,
        sortDirection === 'ascend' ? SortEDirection.ASC : SortEDirection.DESC,
        sortBy
      )
    );
  }
}
