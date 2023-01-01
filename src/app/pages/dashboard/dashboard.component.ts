import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { PageService, FilterService, SortService, AggregateService, EditService, GridComponent, DataStateChangeEventArgs, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PageService, FilterService, SortService, AggregateService, EditService],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {
  // public data: User[] = [];
  // public subjects: string[] = [];
  // public pageOptions: Object = { pageSize: 10, pageCount: 4 };
  // public state: DataStateChangeEventArgs = { skip: 0, take: 10 };
  // public editSettings!: EditSettingsModel;
  // public toolbar!: ToolBarItems;


  // constructor (
  //   private userService: UserService
  // ) {}

  // // public dataStateChange(state: DataStateChangeEventArgs): void {
  // //   this.service.execute(state);
  // // }

  // ngOnInit(): void {
  //   this.data = this.userService.getUsersRegisteredInfo();
  //   this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal'}
  //   this.toolbar = 'Upload', 'Cut', 'Copy', 'Paste','Delete', 'Download', 'SortBy', 'Selection'
  //   // this.service.execute(this.state);
  //   this.separateSubjects();
  // }

  // separateSubjects(): void {
  //   this.subjects = this.data.map(el => el.subjects.toString().concat(','));
  //   console.log('subjects', this.subjects)
  // }










  constructor( private userService: UserService) { }

  @ViewChild('adaptive')
  public grid!: GridComponent;
  public data: User[] = [];
  public pageOptions: Object = { pageSize: 10, pageCount: 4 };
  public state: DataStateChangeEventArgs = { skip: 0, take: 10 };
  public editSettings: Object = {};
  public toolbar: string[] = [];
  public orderidrules: Object = {};
  public customeridrules: Object = {};
  public pageSettings: Object = {};
  public rowMode: string = '';
  public filterSettings: Object = {};
  public isDeskTop: Boolean = true;

  ngOnInit(): void {
    this.data = this.userService.getUsersRegisteredInfo();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.pageSettings = { pageCount: 3 };
    this.rowMode = 'Vertical';
    this.filterSettings = { type: 'Excel' };
    this.isDeskTop = !Browser.isDevice;
  }
  public changeHandler(e: any): void {
      if (e.checked) {
          this.grid.rowRenderingMode = 'Horizontal';
      } else {
          this.grid.rowRenderingMode = 'Vertical';
      }
  }

  public onLoad(): void {
      this.grid.adaptiveDlgTarget = document.getElementsByClassName('e-mobile-content')[0] as HTMLElement;
  }
}
