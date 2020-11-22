import { OnInit, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, IconOptions, LatLng, latLng, Layer, Marker, marker, polyline, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { RoutePoint } from '@model/route-point';
import { Travel } from '@model/travel';
import GeoPoint from 'geo-point';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _fullRoute: RoutePoint[] = [];
  private _travels: Travel[] = [];

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
    this.subscribeTravels();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

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

  private subscribeTravels() {
    let sub = this.store.select(fromRoot.getTravels)
      .subscribe((travels: Travel[]) => {
        this._travels = travels;
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
      weight: 15,
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
    let travelPoints = [this._fullRoute[0].latLng];
    let traveledKmsCounted = 0;

    let color = 'red';
    this._travels.forEach(travel => {
      let distanceInKm = travel.distance;
      while (distanceInKm > 0) {
        let travel = this.makeTravelForDistanceFrom(traveledKmsCounted, distanceInKm * 1000);
        travelPoints.push(travel.travelDestinationPoint);
        traveledKmsCounted += (distanceInKm - travel.remainingKm);
        distanceInKm = travel.remainingKm;
      }

      let travelPolyline = polyline(travelPoints, {
        color: color,
        weight: 5,
        smoothFactor: 0.5
      });


      travelPolyline.bindTooltip("This section was sponsored by " + travel.sponsor);
      travelPolyline.bindPopup("This section was sponsored by " + travel.sponsor);
      layers.push(travelPolyline);
      travelPoints.splice(0, travelPoints.length - 1);

      color = color == 'red' ? 'blue' : 'red';
    });

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