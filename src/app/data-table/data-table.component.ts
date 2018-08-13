import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormService } from './../form.service';
import { User } from '../user';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})

export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource([]);
  data: User[];
  displayedColumns = ['Id', 'Name', 'Email','Password','Socialmedia', 'Address', 'ActionsColumn'];
  keys = [];
  constructor(private formsvc: FormService, private route: ActivatedRoute, private router: Router) {
    //super();
  }


  ngOnInit() {
    this.getData();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(): void {
    this.formsvc.getdata()
      .subscribe(data => this.dataSource.data = data);
  }

  onClick() {
    this.router.navigate(['/add'])
  }

  onEdit(row) {
    console.log(row);
    this.router.navigate([`/detail/${row.id}`])
  }
  onDelete(row) {
    this.dataSource.data = this.dataSource.data.filter(item => item.id != row.id);
    // this.dataSource.data = this.data;

  }

  connect(): Observable<User[]> {

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }
  private getPagedData(data: User[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: User[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

