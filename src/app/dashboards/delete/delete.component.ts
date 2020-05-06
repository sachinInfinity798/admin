import { Component, OnInit, Inject, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {

    dialogRef.disableClose = true
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
  confirmDelete(modalData: any): void {
  }





}
