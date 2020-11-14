import { LatLng, latLng } from 'leaflet';

export class RoutePoint {
    public latLng: LatLng;

    constructor(
        public name: string,
        public coordinates: { lat: number, lng: number },
        public order: number,
    ) {
        this.latLng = latLng(coordinates.lat, coordinates.lng);
    }
}