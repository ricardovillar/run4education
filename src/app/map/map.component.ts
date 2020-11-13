import { AfterViewInit, Component } from '@angular/core';
import { icon, latLng, Layer, marker, polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private _pointsTraveled = 1;

  ghana = latLng(5.604588, -0.186888);
  niger = latLng(17.343158, 9.118531);
  libya = latLng(27.037762, 17.513061);
  algeria = latLng(35.4022524, 1.3337043);
  mali = latLng(20.016038, 2.257073);
  morocco = latLng(33.975837, -6.843321);
  mauritania = latLng(20.305133, -16.906029);
  tenerife = latLng(28.469513, -16.269579);
  malaga = latLng(36.718408, -4.419904);
  bcn = latLng(41.375078, 2.1480167);

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 4,
    center: latLng(26.2120138, 2.7012783)
  };

  routePoints = [
    this.ghana,
    this.niger,
    this.libya,
    this.algeria,
    this.mali,
    this.morocco,
    this.mauritania,
    this.tenerife,
    this.malaga,
    this.bcn,
  ];

  routeTraveled = [
    this.ghana
  ];

  layers: Layer[];

  constructor() {
    this.layers = this.getLayers();
  }

  ngAfterViewInit(): void {
  }

  run() {
    if (this._pointsTraveled < this.routePoints.length) {
      this.routeTraveled.push(this.routePoints[this._pointsTraveled++]);
      this.layers = this.getLayers();
    }
  }

  private getLayers() {
    return [
      marker(this.ghana, {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/images/marker-icon.png',
          iconRetinaUrl: 'assets/images/marker-icon-2x.png',
          shadowUrl: 'assets/images/marker-shadow.png'
        })
      }),
      marker(this.bcn, {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'assets/images/marker-icon.png',
          iconRetinaUrl: 'assets/images/marker-icon-2x.png',
          shadowUrl: 'assets/images/marker-shadow.png'
        })
      }),
      polyline(this.routeTraveled, {
        color: 'red',
        weight: 3
      })
    ];
  }
}