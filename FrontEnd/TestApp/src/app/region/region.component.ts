import { Component, OnInit, Input } from '@angular/core';
import { Region } from './region.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionService } from './region.service';

@Component({
  selector: 'region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css'],
  providers: [RegionService]
})
export class RegionComponent implements OnInit {

  constructor(private regionService: RegionService) { }

  ngOnInit() {
    
  }

}
