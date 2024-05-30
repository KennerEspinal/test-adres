import { Component, OnInit } from '@angular/core';
import { AcquisitionService } from '../../services/acquisition.service';
import { Acquisition } from '../../models/acquisition';

@Component({
  selector: 'app-acquisition-list',
  templateUrl: './acquisition-list.component.html',
  styleUrls: ['./acquisition-list.component.css']
})
export class AcquisitionListComponent implements OnInit {
  acquisitions: Acquisition[] = [];

  constructor(private acquisitionService: AcquisitionService) {}

  ngOnInit(): void {
    this.acquisitionService.getAcquisitions().subscribe(data => {
      this.acquisitions = data;
      console.log(this.acquisitions);
      
    });
  }

  deleteAcquisition(id: number): void {
    this.acquisitionService.deleteAcquisition(id).subscribe(() => {
      this.acquisitions = this.acquisitions.filter(acq => acq.id !== id);
    });
  }
}
