import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { icon, IconOptions, LatLng, latLng, Layer, Marker, marker, polyline, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { RoutePoint } from '@model/route-point';
import { JourneyContribution } from '@app/model/journey-contribution';
import GeoPoint from 'geo-point';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";
import { SportEnum } from '@app/model/sport.enum';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _fullRoute: RoutePoint[] = [];

  Running = SportEnum.Running;
  Trekking = SportEnum.Trekking;
  Cycling = SportEnum.Cycling;
  Swimming = SportEnum.Swimming;

  journeyContributions: JourneyContribution[] = [];
  contributedRoutes: LatLng[] = [];
  layers: Layer[];
  totalDistance: number = 0;

  options = {
    layers: [
      tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      }),
      tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '©OpenStreetMap, ©CartoDB'
      })
    ],
    zoom: 4,
    center: latLng(26.2120138, 2.7012783)
  };

  constructor(private store: Store<fromStore.State>) {
    this.subscribeFullRoute();
    this.subscribeJourneyContributions();
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

  private subscribeJourneyContributions() {
    let sub = this.store.select(fromRoot.getJourneyContributions)
      .subscribe((contributions: JourneyContribution[]) => {
        this.journeyContributions = contributions;
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
    this.addJourneyContributionRoutesTo(layers);
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

  private addJourneyContributionRoutesTo(layers: Layer[]) {
    if (this._fullRoute.length == 0) {
      return;
    }
    this.contributedRoutes = [this._fullRoute[0].latLng];
    let contributedPoints = [this._fullRoute[0].latLng];
    let contributedKMsCounted = 0;

    let color = 'red';
    this.journeyContributions.forEach(contribution => {
      let distanceInKm = contribution.distance;
      while (distanceInKm > 0) {
        let contribution = this.makeJourneyContribution(contributedKMsCounted, distanceInKm * 1000);
        contributedPoints.push(contribution.contributionDestinationPoint);
        contributedKMsCounted += (distanceInKm - contribution.remainingKm);
        distanceInKm = contribution.remainingKm;
      }

      let journeyContributionsPolyline = polyline(contributedPoints, {
        color: contribution.isCompany ? 'green' : color,
        weight: 5,
        smoothFactor: 0.5
      });

      const getTooltipCard = ((layer: Layer | any) => {
        let card = document.getElementById('popup-card-' + layer.contributionId);
        return card;
      });

      const getPopupCard = ((layer: Layer | any) => {
        let card = document.getElementById('tooltip-card-' + layer.contributionId);
        return card;
      });

      journeyContributionsPolyline.bindTooltip(getTooltipCard);
      journeyContributionsPolyline.bindPopup(getPopupCard);

      journeyContributionsPolyline['contributionId'] = contribution.id;

      layers.push(journeyContributionsPolyline);
      contributedPoints.splice(0, contributedPoints.length - 1);

      color = color == 'red' ? 'blue' : 'red';
    });

  }

  private makeJourneyContribution(initialKm: number, distanceInMeters: number): { contributionDestinationPoint: LatLng, remainingKm: number } {
    let routeSectionStartPoint = this.getInitialRoutePointForDistance(initialKm);
    let remainingKm = 0;
    let routeSectionEndPoint = routeSectionStartPoint.nextRoutePoint;
    let startPoint = new GeoPoint(routeSectionStartPoint.coordinates.lat, routeSectionStartPoint.coordinates.lng);
    let endPoint = new GeoPoint(routeSectionEndPoint.coordinates.lat, routeSectionEndPoint.coordinates.lng);
    let bearing = startPoint.calculateBearing(endPoint);
    let contributionDestinationPoint: LatLng;
    let contributionKMs = distanceInMeters / 1000;
    let contributionFinalKm = initialKm + contributionKMs;
    if (routeSectionStartPoint.finalKm > contributionFinalKm) {
      let distanceFromSectionStarting = (initialKm - routeSectionStartPoint.initialKm) * 1000;
      let initialKmGeoPoint = startPoint.calculateDestination(distanceFromSectionStarting, bearing);
      let nextContributedGeoPoint = initialKmGeoPoint.calculateDestination(distanceInMeters, bearing);
      contributionDestinationPoint = latLng(nextContributedGeoPoint.latitude, nextContributedGeoPoint.longitude);
    }
    else {
      contributionDestinationPoint = routeSectionEndPoint.latLng;
      remainingKm = contributionFinalKm - routeSectionEndPoint.initialKm;
    }
    return { contributionDestinationPoint: contributionDestinationPoint, remainingKm };
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