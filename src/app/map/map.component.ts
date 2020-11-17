import { RoutePoint } from '@model/route-point';
import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, IconOptions, LatLng, latLng, Layer, Marker, marker, polyline, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import GeoPoint from 'geo-point';

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
  private _fullRoute: RoutePoint[] = [];

  traveledKMs: number[] = [];
  totalDistance: number = 0;

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
    //this.layers = this.getLayers();
  }

  ngOnInit(): void {
    this.store.dispatch(mapActions.loadRoutes());
  }

  run() {
    this.traveledKMs.push(2);
    this.fillMap();
  }

  // private getLayers() {
  //   return [
  //     marker(this.ghana, {
  //       icon: icon({
  //         iconSize: [25, 41],
  //         iconAnchor: [13, 41],
  //         iconUrl: 'assets/images/marker-icon.png',
  //         iconRetinaUrl: 'assets/images/marker-icon-2x.png',
  //         shadowUrl: 'assets/images/marker-shadow.png'
  //       })
  //     }),
  //     marker(this.bcn, {
  //       icon: icon({
  //         iconSize: [25, 41],
  //         iconAnchor: [13, 41],
  //         iconUrl: 'assets/images/marker-icon.png',
  //         iconRetinaUrl: 'assets/images/marker-icon-2x.png',
  //         shadowUrl: 'assets/images/marker-shadow.png'
  //       })
  //     }),
  //     polyline(this.routeTraveled, {
  //       color: 'rgb(255, 222, 1)',
  //       weight: 5,
  //       smoothFactor: 0.5
  //     })
  //   ];

  // }

  private subscribeFullRoute() {
    let sub = this.store.select(fromRoot.getFullRoute)
      .subscribe((fullRoute: RoutePoint[]) => {
        this._fullRoute = [];
        this._fullRoute = fullRoute;
        this.calcFullRouteDistance();
        this.fillMap();
      });
    this._subscriptions.push(sub);
  }

  private calcFullRouteDistance() {
    this.totalDistance = 0;
    let previousPoint: RoutePoint;
    this._fullRoute.forEach(nextPoint => {
      if (previousPoint) {
        this.totalDistance += nextPoint.calcDistanceFrom(previousPoint);
      }
      previousPoint = nextPoint;
    });
  }

  private fillMap() {
    let layers: Layer[] = [];
    this.addRoutePathTo(layers);
    this.addRouteMarkersTo(layers);
    this.addTraveledRouteTo(layers);
    this.layers = layers;
  }

  private addRoutePathTo(layers: Layer[]) {
    let fullRouteCoordinates = this._fullRoute.map(routePoint => routePoint.latLng);
    let routePath = polyline(fullRouteCoordinates, {
      color: 'rgb(255, 222, 1)',
      weight: 10,
      opacity: 0.5
    });
    layers.push(routePath);
  }

  private addRouteMarkersTo(layers: Layer[]) {
    this._fullRoute.map(routePoint => {
      if (routePoint.detail) {
        let marker = toRouteMarker(routePoint);
        marker.bindPopup(routePoint.name + ": " + routePoint.detail);
        layers.push(marker);
      }
    });
  }

  private addTraveledRouteTo(layers: Layer[]) {
    if (this._fullRoute.length == 0) {
      return;
    }

    this.routeTraveled = [this._fullRoute[0].latLng];

    const startPoint = new GeoPoint(this._fullRoute[0].coordinates.lat, this._fullRoute[0].coordinates.lng);
    const endPoint = new GeoPoint(this._fullRoute[1].coordinates.lat, this._fullRoute[1].coordinates.lng);
    const bearing = startPoint.calculateBearing(endPoint);
    let currentTraveledGeoPoint = startPoint;
    for (let index = 0; index < this.traveledKMs.length - 1; index++) {
      const distance = this.traveledKMs[index] * 1000;
      let nextTraveledGeoPoint = currentTraveledGeoPoint.calculateDestination(distance, bearing);
      let traveledRoutePoint = latLng(nextTraveledGeoPoint.latitude, nextTraveledGeoPoint.longitude);
      this.routeTraveled.push(traveledRoutePoint);
      currentTraveledGeoPoint = nextTraveledGeoPoint;
    }

    let traveledRoutePolyline = polyline(this.routeTraveled, {
      color: 'red',
      weight: 3,
      smoothFactor: 0.5
    });

    layers.push(traveledRoutePolyline);
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