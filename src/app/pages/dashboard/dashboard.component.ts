import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Browser } from '@syncfusion/ej2-base';
import { PageService, FilterService, SortService, AggregateService, EditService, GridComponent, DataStateChangeEventArgs, EditSettingsModel, IEditCell, TimePickerEditCell } from '@syncfusion/ej2-angular-grids';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/services/user-service/user.service';
import { MultiSelect } from '@syncfusion/ej2-angular-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [PageService, FilterService, SortService, AggregateService, EditService],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  @ViewChild('adaptive')
  public grid!: GridComponent;
  public data: User[] = [];
  public pageOptions: Object = { pageSize: 5, pageCount: 4 };
  public state: DataStateChangeEventArgs = { skip: 0, take: 10 };
  public editSettings: Object = {};
  public toolbar: string[] = [];
  public orderidrules: Object = {};
  public customeridrules: Object = {};
  public rowMode: string = '';
  public filterSettings: Object = {};
  public isDeskTop: Boolean = true;
  public ddElem!: HTMLElement;
  public multiSelectObj!: MultiSelect;
  public multiselectDatasource = [
    { Asignatura: 'Inglés', Id: '1' },
    { Asignatura: 'Matemáticas', Id: '2' }
  ];
  public dsParams!: IEditCell;
  public genderParams!: IEditCell;
  public dpParams!: IEditCell;
  public genders: string[] = ['Hombre', 'Mujer'];
  public createSubjectFn = () => {
    this.ddElem = document.createElement('input');
    return this.ddElem;
  };
  public readSubjectFn = () => {
    return this.multiSelectObj.value;
  };
  public destroySubjectFn = () => {
    this.multiSelectObj.destroy();
  };
  public writeSubjectFn = (args: any) => {
    let multiSelectVal = args.rowData[args.column.field]
      ? args.rowData[args.column.field]
      : [];
    this.multiSelectObj = new MultiSelect({
      value: multiSelectVal,
      dataSource: this.multiselectDatasource,
      fields: { value: 'Asignatura', text: 'Asignatura' },
      floatLabelType: 'Never',
      mode: 'Box'
    });
    this.multiSelectObj.appendTo(this.ddElem);
  };


  ngOnInit(): void {
    this.data = this.userService.getUsersRegisteredInfo();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.orderidrules = { required: true, number: true };
    this.customeridrules = { required: true };
    this.rowMode = 'Vertical';
    this.filterSettings = { type: 'Excel' };
    this.isDeskTop = !Browser.isDevice;
    this.dsParams = {
      create: this.createSubjectFn,
      read: this.readSubjectFn,
      destroy: this.destroySubjectFn,
      write: this.writeSubjectFn
    };
    this.genderParams = {
      params: {
        allowFiltering: true,
        dataSource: new DataManager(this.genders),
        fields: { text: 'Género', value: 'Género' },
        query: new Query(),
        actionComplete: () => false
      }
    };
    this.dpParams = { params: { value: new Date() } };
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

  actionComplete(args: any) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      const dialog = args.dialog;
      const name = 'Nombre';
      dialog.showCloseIcon = false;
      dialog.height = 400;
      // change the header of the dialog
      dialog.header = args.requestType === 'beginEdit' ? 'Editar usuario: ' + args.rowData['name'] : 'Nuevo usuario';
    }
  }
}
