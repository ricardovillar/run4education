import { RoutePoint } from '@model/route-point';
import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, IconOptions, latLng, Layer, Marker, marker, polyline, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";
import * as mapActions from '@store/actions/map/map.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private _subscriptions: Array<Subscription> = [];
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
    zoom: 3,
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

  constructor(private store: Store<fromStore.State>) {
    this.subscribeFullRoute();
    this.layers = this.getLayers();
  }

  ngOnInit(): void {
    this.store.dispatch(mapActions.loadRoutes());
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
        color: 'rgb(255, 222, 1)',
        weight: 5,
        smoothFactor: 0.5
      })
    ];
  }

  private subscribeFullRoute() {
    let sub = this.store.select(fromRoot.getFullRoute)
      .subscribe((fullRoute: RoutePoint[]) => {
        this.paintFullRoute(fullRoute);
      });
    this._subscriptions.push(sub);
  }

  private paintFullRoute(fullRoute: RoutePoint[]) {
    let fullRouteCoordinates = fullRoute.map(x => x.latLng);
    let routePath = polyline(fullRouteCoordinates, {
      color: 'rgb(255, 222, 1)',
      weight: 7,
      opacity: 0.5
    });

    let layers: Layer[] = [routePath];
    let markers = fullRoute.map(routePoint => {
      if (routePoint.detail) {
        let marker = toRouteMarker(routePoint);
        marker.bindPopup(routePoint.name + ": " + routePoint.detail);
        layers.push(marker);
      }
    });
    this.layers = layers;
  }
}


function toRouteMarker(routePoint: RoutePoint): Marker {
  let iconOptions: IconOptions = {
    iconSize: [20, 31],
    iconAnchor: [13, 41],
    iconUrl: 'assets/images/marker-icon.png',
    iconRetinaUrl: 'assets/images/marker-icon-2x.png',
    shadowUrl: 'assets/images/marker-shadow.png'
  };
  return marker(routePoint.latLng, { icon: icon(iconOptions) });
}