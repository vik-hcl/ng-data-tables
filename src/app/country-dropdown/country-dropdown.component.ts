import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-country-dropdown',
  templateUrl: './country-dropdown.component.html',
  styleUrls: ['./country-dropdown.component.scss']
})
export class CountryDropdownComponent {
  private cellValue!: string;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.cellValue = this.getValueToDisplay(params);
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams) {
       // set value into cell again
       this.cellValue = this.getValueToDisplay(params);
   }

   buttonClicked() {
       alert(`${this.cellValue} medals won!`)
   }

   getValueToDisplay(params: ICellRendererParams) {
       return params.valueFormatted ? params.valueFormatted : params.value;
   }

}

// -> show dropdown cell rendered component only on 
//1. if params has data
// 2. if edit button has been clicked