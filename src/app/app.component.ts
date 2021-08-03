import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AgGridAngular } from 'ag-grid-angular';
import { ICellRendererParams, GridOptions } from 'ag-grid-community';

import { DeleteButtonCellComponent } from './delete-button-cell/delete-button-cell.component';
import { EditButtonCellComponent } from './edit-button-cell/edit-button-cell.component';
import { DropdownRendererComponent } from './dropdown-renderer/dropdown-renderer.component';
import { CountryDropdownComponent } from './country-dropdown/country-dropdown.component';

function actionCellRenderer(params: ICellRendererParams) {
  let eGui = document.createElement("div");
  let editingCells = params.api.getEditingCells();
  let isCurrentRowEditing = editingCells.some((cell) => {
    return cell.rowIndex === params.node.rowIndex;
  });
  if (params.data) {
    if (isCurrentRowEditing) {
      eGui.innerHTML = `
      <button  class="action-button tion="update"  data-action="update"> update  </button>
      <button  class="action-button cancel"  data-action="cancel" > cancel </button>
      `;
    } else {
      eGui.innerHTML = `
      <button class="action-button edit"  data-action="edit" > edit  </button>
      <button class="action-button delete" data-action="delete" > delete </button>
      `;
    }
  }

  return eGui;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid!: AgGridAngular;
  selectedNodes: any;
  selectedData: any;
  defaultColDef: any;
  rowData: any;
  autoGroupColumnDef: any;
  // gridOptions: any;
  // groupRowRenderer: any;
  countryValue = ['Japan', 'Hong kong', 'United States of America'];
  showCountryDropDown = false;
  getDataPath: any;
  groupDefaultExpanded: any;
  columnDefs = [
    { headerName: 'Athletes By Name', field: 'athlete', colId: 'athlete' },
    { headerName: 'Age', field: 'age', colId: 'age', editable: true },
    { headerName: 'Country', field: 'country', colId: 'country', editable: true, cellEditor: 'agSelectCellEditor', 
      cellEditorParams: {
        values: this.countryValue
      },
    },
    { headerName: 'Year', field: 'year', colId: 'year', editable: true },
    { headerName: 'Date', field: 'date', colId: 'date', editable: true },
    { headerName: 'Sport', field: 'sport', colId: 'sport', editable: true },
    { headerName: 'Gold', field: 'gold', colId: 'gold', editable: true },
    { headerName: 'Silver', field: 'silver', colId: 'silver', editable: true },
    { headerName: 'Bronze', field: 'bronze', colId: 'bronze', editable: true },
    { headerName: 'Total', field: 'total', colId: 'total', editable: true },
    { 
      headerName: 'Action',
      field: 'action',
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: 'action',
    }
  ];

  constructor(
    private http: HttpClient
  ) {
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
    };
    this.autoGroupColumnDef = {
      headerName: 'Athletes by Name',
      minWidth: 250,
      // editable: false,
      // checkboxSelection: false,
      // cellRenderer:'agGroupCellRenderer'
      cellRendererParams: { suppressCount: true }
    };

    // this.groupDefaultExpanded = -1;
    // this.getDataPath = function (data: any) {
    //   return data.athlete;
    // };
    // this.gridOptions = {
    //   enableRangeSelection: true,
    //   rowSelection: "multiple",
    //   editType: "fullRow",
    //   suppressClickEdit: true,
    //   animateRows: true,
    //   rowMultiSelectWithClick: true,
      
    // }

  }

  // groupRowRenderer(rowItem: any) {
  //   console.log('ri', rowItem);
  //   if (rowItem.participants) {
  //     return {
  //       group: true,
  //       // open C be default
  //       expanded: rowItem.group === 'Michael Phelps',
  //       // provide ag-Grid with the children of this group
  //       children: rowItem.participants,
  //       // the key is used by the default group cellRenderer
  //       key: rowItem.group
  //     };
  //   } else {
  //     return null;
  //   }
  // }

  onGridReady(params: ICellRendererParams) {
    this.http
      .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data: any) => {
        console.log({data});
        const allData = data.slice(0, 30);
        // console.log({allData});
        // const groupByAthletes = allData.reduce((acc: any, cv: any) => {
        //   acc[cv.athlete] = [...acc[cv.athlete] || [], cv];
        //   return acc;
        //  }, []);
        //  const groupData = Object.keys(groupByAthletes).map((key) => {
        //   return { group: key, participants: groupByAthletes[key] };
        // });
        this.rowData = allData;
        // console.log('row data', this.rowData);

        // const athleteArray = [...new Set(allData.map((elm: any) => elm.athlete))];
        // console.log({athleteArray});
        // const treeData = allData.map((el: any) => {
        //   return { ...el, athlete: athleteArray }
        // })
        // console.log({treeData});
        // this.rowData = treeData;
        // console.log('rd', this.rowData);
      });
  }

  onRowSelected(event: any) {
    this.selectedNodes = this.agGrid.api.getSelectedNodes();
    this.selectedData = this.selectedNodes.map((node: any) => node.data);
  }

  onCellClicked(params: any) {
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;
      
      if (action === "edit") {
        console.log('edit params', params);
        this.showCountryDropDown = true;
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          colKey: 'total'
        });

      }

      if (action === "delete") {
        console.log('delete params', params);
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        this.showCountryDropDown = false;
        console.log('updatem params', params);
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        this.showCountryDropDown = false;
        params.api.stopEditing(true);
      }
    }
  }

  onRowEditingStarted(params: any) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  onRowEditingStopped(params: any) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }

}
