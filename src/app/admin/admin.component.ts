import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { OrderByDirection } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['email', 'username', 'firstname', 'lastname', 'actions'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]) ;
  
  usersLimitOptions: number[] = [1, 3, 5];
  selectedLimit: number = 2;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  deleteUser(id: string): void {
    this.userService.delete(id);
  }

  sortUsers(order: OrderByDirection): void {
    this.userService.getAllOrderedBy('username', order).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }

  getUsersWithLimit(): void {
    this.userService.getAllLimitedBy(this.selectedLimit).subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
    });
  }


}

