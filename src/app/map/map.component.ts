import { RoutePoint } from '@model/route-point';
import { OnInit, Component, OnDestroy } from '@angular/core';
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
export class MapComponent implements OnInit, OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _fullRoute: RoutePoint[] = [];

  traveledKMs: number[] = [];
  totalDistance: number = 0;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' })
    ],
    zoom: 3,
    center: latLng(26.2120138, 2.7012783)
  };


  routeTraveled: LatLng[] = [];

  layers: Layer[];

  constructor(private store: Store<fromStore.State>) {
    this.subscribeFullRoute();
  }

  ngOnInit(): void {
    this.store.dispatch(mapActions.loadRoutes());
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  run() {
    this.traveledKMs.push(12.785);
    this.fillMap();
  }

  private subscribeFullRoute() {
    let sub = this.store.select(fromRoot.getFullRoute)
      .subscribe((fullRoute: RoutePoint[]) => {
        this._fullRoute = [];
        this._fullRoute = fullRoute;
        console.log(fullRoute);
        this.calcFullRouteDistance();
        this.fillMap();
      });
    this._subscriptions.push(sub);
  }

  private calcFullRouteDistance() {
    if (this._fullRoute.length > 0) {
      let lastPoint = this._fullRoute[this._fullRoute.length - 1];
      this.totalDistance = lastPoint.initialKm;
    }
    else {
      this.totalDistance = 0;
    }
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

    let traveledKmsCounted = 0;
    for (let index = 0; index < this.traveledKMs.length; index++) {
      let distanceInKm = this.traveledKMs[index];
      while (distanceInKm > 0) {
        let travel = this.makeTravelForDistanceFrom(traveledKmsCounted, distanceInKm * 1000);
        this.routeTraveled.push(travel.travelDestinationPoint);
        traveledKmsCounted += (distanceInKm - travel.remainingKm);
        distanceInKm = travel.remainingKm;
      }
    }

    let traveledRoutePolyline = polyline(this.routeTraveled, {
      color: 'red',
      weight: 3,
      smoothFactor: 0.5
    });

    layers.push(traveledRoutePolyline);
  }

  private makeTravelForDistanceFrom(initialKm: number, distanceInMeters: number): { travelDestinationPoint: LatLng, remainingKm: number } {
    let routeSectionStartPoint = this.getInitialRoutePointForDistance(initialKm);
    let remainingKm = 0;
    let routeSectionEndPoint = routeSectionStartPoint.nextRoutePoint;
    let startPoint = new GeoPoint(routeSectionStartPoint.coordinates.lat, routeSectionStartPoint.coordinates.lng);
    let endPoint = new GeoPoint(routeSectionEndPoint.coordinates.lat, routeSectionEndPoint.coordinates.lng);
    let bearing = startPoint.calculateBearing(endPoint);
    let travelDestinationPoint: LatLng;
    let travelKMs = distanceInMeters / 1000;
    let travelFinalKm = initialKm + travelKMs;
    if (routeSectionStartPoint.finalKm > travelFinalKm) {
      let distanceFromSectionStarting = (initialKm - routeSectionStartPoint.initialKm) * 1000;
      let initialKmGeoPoint = startPoint.calculateDestination(distanceFromSectionStarting, bearing);
      let nextTraveledGeoPoint = initialKmGeoPoint.calculateDestination(distanceInMeters, bearing);
      travelDestinationPoint = latLng(nextTraveledGeoPoint.latitude, nextTraveledGeoPoint.longitude);
    }
    else {
      travelDestinationPoint = routeSectionEndPoint.latLng;
      remainingKm = travelFinalKm - routeSectionEndPoint.initialKm;
    }
    return { travelDestinationPoint, remainingKm };
  }

  private getInitialRoutePointForDistance(distance: number): RoutePoint {
    let routePoint = this._fullRoute.find(x => x.initialKm <= distance && x.finalKm > distance);
    return routePoint;
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