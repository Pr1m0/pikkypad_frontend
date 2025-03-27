// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ChildService } from '../../services/child.service';

// @Component({
//   selector: 'app-children-dashboard',
//   templateUrl: './children-dashboard.component.html',
// })
// export class ChildrenDashboardComponent {
//   childForm!: FormGroup;
//   children: any[] = [];
//   isEdit = false;
//   editId: number | null = null;

//   constructor(private fb: FormBuilder, private childService: ChildService) {}

//   ngOnInit() {
//     this.childForm = this.fb.group({
//       name: [''],
//       age: ['']
//     });

//     this.getChildren();
//   }

//   getChildren() {
//     this.childService.getChildren().subscribe({
//       next: (res: any) => this.children = res.data,
//       error: (err) => console.error(err)
//     });
//   }

//   onSubmit() {
//     if (this.isEdit) {
//       this.childService.updateChild(this.editId!, this.childForm.value).subscribe({
//         next: () => {
//           this.getChildren();
//           this.resetForm();
//         }
//       });
//     } else {
//       this.childService.addChild(this.childForm.value).subscribe({
//         next: () => {
//           this.getChildren();
//           this.childForm.reset();
//         }
//       });
//     }
//   }

//   editChild(child: any) {
//     this.childForm.patchValue({
//       name: child.name,
//       age: child.age
//     });
//     this.isEdit = true;
//     this.editId = child.id;
//   }

//   cancelEdit() {
//     this.resetForm();
//   }

//   resetForm() {
//     this.childForm.reset();
//     this.isEdit = false;
//     this.editId = null;
//   }

//   deleteChild(id: number) {
//     this.childService.deleteChild(id).subscribe({
//       next: () => this.getChildren()
//     });
//   }
// }
