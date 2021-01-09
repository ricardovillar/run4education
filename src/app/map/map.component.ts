import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { divIcon, DivIconOptions, icon, IconOptions, LatLng, latLng, Layer, Map, Marker, marker, PointExpression, Polyline, polyline, tileLayer } from 'leaflet';
import { Subscription } from 'rxjs';
import { RoutePoint } from '@model/route-point';
import { JourneyContribution } from '@app/model/journey-contribution';
import { SportEnum } from '@app/model/sport.enum';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import GeoPoint from 'geo-point';

import * as fromStore from "@store/reducers/index";
import * as fromRoot from "@store/reducers";

let apiLoaded = false;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  private _subscriptions: Array<Subscription> = [];
  private _fullRoute: RoutePoint[] = [];
  private _markers: { [id: string]: Polyline; } = {};
  private _highlightId: any;
  private _map: Map;
  private _isMobile: boolean;
  private _isTablet: boolean;

  journeyContributions: JourneyContribution[] = [];
  contributedRoutes: LatLng[] = [];
  layers: Layer[];
  totalDistance: number = 0;
  playerVars: YT.PlayerVars = {
    rel: YT.RelatedVideos.Hide
  };

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
    maxZoom: 10,
    center: latLng(26.2120138, 2.7012783)
  };

  constructor(
    private store: Store<fromStore.State>,
    deviceService: DeviceDetectorService,
    route: ActivatedRoute) {
    route.queryParamMap.subscribe((params) => this._highlightId = params.get('c'));
    this.subscribeFullRoute();
    this.subscribeJourneyContributions();
    this._isMobile = deviceService.isMobile();
    this._isTablet = deviceService.isTablet();
  }

  ngOnInit() {
    this.loadYoutubeApi();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  onMapReady(map: Map) {
    this._map = map;
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
    this.addStartAndEndRouteMarkers(layers);
    this.addJourneyContributionRoutesTo(layers);
    this.layers = layers;
  }

  private addRoutePathTo(layers: Layer[]) {
    let fullRouteCoordinates = this._fullRoute.map(routePoint => routePoint.latLng);
    let routePath = this.createPathPolyline(fullRouteCoordinates, 'rgb(255, 222, 1)');
    layers.push(routePath);
  }

  private createPathPolyline(coordinates: LatLng[], color: string) {
    let weight = this._isMobile ? 14 :
      this._isTablet ? 12 : 8;
    let dashArray = this._isMobile ? '1,16' :
      this._isTablet ? '1,14' : '1,10';
    return polyline(coordinates, { color, dashArray, weight });
  }

  private addRouteMarkersTo(layers: Layer[]) {
    this._fullRoute.map(routePoint => {
      if (routePoint.elementId) {
        let marker = toRouteMarker(routePoint);
        let balloon = document.getElementById(routePoint.elementId);
        let offset: PointExpression = [0, -20];
        let minWidth = 640;
        marker.bindPopup(balloon, { offset, minWidth });
        layers.push(marker);
      }
    });
  }

  private addStartAndEndRouteMarkers(layers: Layer[]) {
    let startRoutePoint = this._fullRoute[0];
    let startBalloon = document.getElementById('start-point-balloon');
    let startIconOptions: DivIconOptions = { iconSize: [1, 1], html: startBalloon, className: 'icon-right' };
    let startMarker = marker(startRoutePoint.latLng, { icon: divIcon(startIconOptions) });

    layers.push(startMarker);

    let endRoutePoint = this._fullRoute[this._fullRoute.length - 1];
    let endBalloon = document.getElementById('end-point-balloon');
    let endIconOptions: DivIconOptions = { iconSize: [1, 1], html: endBalloon };
    let endMarker = marker(endRoutePoint.latLng, { icon: divIcon(endIconOptions) });
    layers.push(endMarker);
  }

  private addJourneyContributionRoutesTo(layers: Layer[]) {
    if (this._fullRoute.length == 0) {
      return;
    }
    this.contributedRoutes = [this._fullRoute[0].latLng];
    let contributedPoints = [this._fullRoute[0].latLng];
    let contributedKMsCounted = 0;

    this.journeyContributions.forEach(contribution => {
      let distanceInKm = contribution.distance;
      while (distanceInKm > 0) {

        let journeyContribution = this.makeJourneyContribution(contributedKMsCounted, distanceInKm * 1000);
        contributedPoints.push(journeyContribution.contributionDestinationPoint);
        contributedKMsCounted += (distanceInKm - journeyContribution.remainingKm);
        distanceInKm = journeyContribution.remainingKm;
      }

      let color = this.getColorForContribution(contribution);
      let journeyContributionsPolyline = this.createPathPolyline(contributedPoints, color);

      const getTooltipCard = ((layer: Layer | any) => {
        let card = document.getElementById('tooltip-card-' + layer.contributionId);
        return card;
      });

      const getPopupCard = ((layer: Layer | any) => {
        let card = document.getElementById('popup-card-' + layer.contributionId);
        return card;
      });

      journeyContributionsPolyline.bindTooltip(getTooltipCard);
      journeyContributionsPolyline.bindPopup(getPopupCard);

      journeyContributionsPolyline['contributionId'] = contribution._id;

      layers.push(journeyContributionsPolyline);
      contributedPoints.splice(0, contributedPoints.length - 1);

      this._markers[contribution._id] = journeyContributionsPolyline;
      if (this._highlightId && this._highlightId == contribution._id) {
        this.highlight(this._highlightId);
      }

    });

  }

  private getColorForContribution(contribution: JourneyContribution): string {
    if (contribution.isCompany) {
      return '#fb7400';
    }
    switch (contribution.sport) {
      case SportEnum.Trekking:
        return '#b125cc';
      case SportEnum.Swimming:
        return '#1b4585';
      case SportEnum.Cycling:
        return '#ba1b17';
      case SportEnum.Running:
      default:
        return '#702426';
    }
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
      remainingKm = contributionFinalKm - routeSectionEndPoint.initialKm - 0.001;  // advance 1 meter to avoid infine loop due to roundings differences
    }
    return { contributionDestinationPoint: contributionDestinationPoint, remainingKm };
  }

  private getInitialRoutePointForDistance(distance: number): RoutePoint {
    let routePoint = this._fullRoute.find(x => x.initialKm <= distance && x.finalKm > distance);
    return routePoint;
  }

  private highlight(id: any) {
    if (!id) {
      return;
    }
    let marker: Polyline = this._markers[id];
    if (marker) {
      setTimeout(() => this.recenterMapAndOpenPopupOf(marker), 500);
    }
  }

  private recenterMapAndOpenPopupOf(marker: Polyline) {
    let latLng = marker.getCenter();
    marker.togglePopup();
    this._map.flyTo(latLng, 8);
  }

  private loadYoutubeApi() {
    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

}

function toRouteMarker(routePoint: RoutePoint): Marker {
  let iconUrl = routePoint.markerType == 'video' ? 'assets/images/video.png' : 'assets/images/texto.png';
  let iconOptions: IconOptions = {
    iconSize: [30, 39],
    iconAnchor: [15, 39],
    iconUrl: iconUrl,
    iconRetinaUrl: iconUrl
  };
  return marker(routePoint.latLng, { icon: icon(iconOptions) });
}