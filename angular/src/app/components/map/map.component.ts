import { Component, Input, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  latitude = 33.9715904;
  longitude = -6.8498129;
  locationChosen = false;
  @Input() eventToParent = new Subject<{ lat: number, lng: number }>()
  constructor() { }

  ngOnInit(): void {
  }

  onChooseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;
    console.log(this.latitude, this.longitude);

    this.eventToParent.next({ lat: this.latitude, lng: this.longitude })
  }

}
