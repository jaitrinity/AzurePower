import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { ViewCell } from "ng2-smart-table";

@Component({
    selector: 'employee-action-view',
    template: 
            `<div>
                <button class='mybtn' title='Edit' (click)="editEmployee1(rowData)">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </button>
                <button class='mybtn' title='Activate' *ngIf="rowData.active == '1'" (click)="actionOnEmployee1(rowData, 1)">
                    <i class="fa fa-ban" aria-hidden="true"></i>
                </button>
                <button class='mybtn' title='Deactivate' *ngIf="rowData.active == '1'" (click)="actionOnEmployee1(rowData, 0)">
                    <i class="fa fa-ban" aria-hidden="true"></i>
                </button>
            </div>`,
    styleUrls: []
})

export class EmployeeActionComponent implements ViewCell, OnInit{
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;

    @Output() editEmployee: EventEmitter<any> = new EventEmitter();
    @Output() actionOnEmployee: EventEmitter<any> = new EventEmitter();


    ngOnInit() {
        this.renderValue = this.value.toString().toUpperCase();
    }

    editEmployee1(a) {
        this.editEmployee.emit(this.rowData);
    }
    actionOnEmployee1(a,b) {
        this.actionOnEmployee.emit(this.rowData);
    }

}