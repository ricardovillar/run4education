import { LatLng, latLng } from 'leaflet';

export class RoutePoint {
    private _next: RoutePoint;
    private _previous: RoutePoint;
    private _initialKm: number = 0;
    private _finalKm: number = 0;

    public latLng: LatLng;

    get initialKm(): number {
        return this._initialKm;
    }

    get finalKm(): number {
        return this._finalKm;
    }

    get nextRoutePoint(): RoutePoint {
        return this._next;
    }
    set nextRoutePoint(value: RoutePoint) {
        this._next = value;
        this._finalKm = this._initialKm + this.calcDistanceFrom(this._next);
    }

    get previousRoutePoint(): RoutePoint {
        return this._previous;
    }
    set previousRoutePoint(value: RoutePoint) {
        this._previous = value;
        this.previousRoutePoint.nextRoutePoint = this;
        this._initialKm = this._previous.finalKm;
    }

    constructor(
        public name: string,
        public coordinates: { lat: number, lng: number },
        public detail: any = null
    ) {
        this.latLng = latLng(coordinates.lat, coordinates.lng);
    }

    calcDistanceFrom(routePoint: RoutePoint) {
        //const R = 6371;
        const R = 7673;
        let lat1 = this.coordinates.lat;
        let lng1 = this.coordinates.lng;
        let lat2 = routePoint.coordinates.lat;
        let lng2 = routePoint.coordinates.lng;
        let dLat = deg2rad(lat2 - lat1);
        let dLon = deg2rad(lng2 - lng1);
        let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let distance = R * c; // Distance in km
        return distance;
    }

}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}