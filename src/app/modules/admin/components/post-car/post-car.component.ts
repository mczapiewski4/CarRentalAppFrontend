import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss']
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null=null;
  imagePreview: string | ArrayBuffer | null=null;
  listOfOption: Array<{ label: string; value: string}> = [];
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
    private adminService: AdminService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar() {
    console.log(this.postCarForm.value);
    this.isSpinning = true;
    const formData: FormData = new FormData();
    if (this.selectedFile !== null) {
      formData.append('image', this.selectedFile);
    }
    const brandControl = this.postCarForm.get('brand');
    if (brandControl) {
    formData.append('brand', brandControl.value);
    }
    const nameControl = this.postCarForm.get('name');
    if (nameControl) {
    formData.append('name', nameControl.value);
    }
    const typeControl = this.postCarForm.get('type');
    if (typeControl) {
    formData.append('type', typeControl.value);
    }
    const colorControl = this.postCarForm.get('color');
    if (colorControl) {
    formData.append('color', colorControl.value);
    }
    const yearControl = this.postCarForm.get('year');
    if (yearControl) {
    formData.append('year', yearControl.value);
    }
    const transmissionControl = this.postCarForm.get('transmission');
    if (transmissionControl) {
    formData.append('transmission', transmissionControl.value);
    }
    const descriptionControl = this.postCarForm.get('description');
    if (descriptionControl) {
    formData.append('description', descriptionControl.value);
    }
    const priceControl = this.postCarForm.get('price');
    if (priceControl) {
    formData.append('price', priceControl.value);
    }
    console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.message.success("Car posted successfully", { nzDuration: 5000 })
      this.router.navigateByUrl("/admin/dashboard");
      console.log(res);
    }, error => {
      this.message.error("Error while posting car", { nzDuration: 5000 })
    })
  }

  onFileSelected(event : any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();

  }

  previewImage() {
    if (this.selectedFile !== null) {
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
    }
  }
}
