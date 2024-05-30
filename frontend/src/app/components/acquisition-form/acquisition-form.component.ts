import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../services/acquisition.service';
import { Acquisition } from '../../models/acquisition';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acquisition-form',
  templateUrl: './acquisition-form.component.html',
  styleUrls: ['./acquisition-form.component.css']
})
export class AcquisitionFormComponent implements OnInit {
  acquisitions: Acquisition[] = [];
  acquisitionForm: FormGroup;

  constructor(private fb: FormBuilder, private acquisitionService: AcquisitionService, private router: Router) {
    this.acquisitionForm = this.fb.group({
      presupuesto: ['', Validators.required],
      unidad: ['', Validators.required],
      tipoBienServicio: ['', Validators.required],
      cantidad: ['', Validators.required],
      valorUnitario: ['', Validators.required],
      valorTotal: ['', Validators.required],
      fechaAdquisicion: ['', Validators.required],
      proveedor: ['', Validators.required],
      documentacion: [''],
      estado: ['activo']
    });
  }

  ngOnInit(): void {
    this.loadAcquisitions();
  }

  loadAcquisitions() {
    this.acquisitionService.getAcquisitions().subscribe(data => {
      this.acquisitions = data;
    });
  }

  onSubmit() {
    if (this.acquisitionForm.valid) {
      this.acquisitionService.createAcquisition(this.acquisitionForm.value).subscribe(data => {
        this.acquisitions.push(data);
        this.router.navigate(['/acquisitions']);
      });
    }
  }

  deleteAcquisition(id: number) {
    this.acquisitionService.deleteAcquisition(id).subscribe(() => {
      this.acquisitions = this.acquisitions.filter(a => a.id !== id);
    });
  }
}
