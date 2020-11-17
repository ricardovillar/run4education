import { LatLng, latLng } from 'leaflet';

export class RoutePoint {
    private _next: RoutePoint;
    private _previous: RoutePoint;

    public latLng: LatLng;

    get nextRoutePoint(): RoutePoint {
        return this._next;
    }
    set nextRoutePoint(value: RoutePoint) {
        this._next = value;
    }

    get previousRoutePoint(): RoutePoint {
        return this._previous;
    }
    set previousRoutePoint(value: RoutePoint) {
        this._previous = value;
    }

    constructor(
        public name: string,
        public coordinates: { lat: number, lng: number },
        public order: number,
        public detail: any = null
    ) {
        this.latLng = latLng(coordinates.lat, coordinates.lng);
    }

    setNextRoutePoint(value: RoutePoint) {
        this._next = value;
    }

    public calcDistanceFrom(routePoint: RoutePoint) {
        const R = 6371;
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



    // private getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //     var R = 6371; // Radius of the earth in km
    //     var dLat = deg2rad(lat2-lat1);  // deg2rad below
    //     var dLon = deg2rad(lon2-lon1); 
    //     var a = 
    //       Math.sin(dLat/2) * Math.sin(dLat/2) +
    //       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    //       Math.sin(dLon/2) * Math.sin(dLon/2)
    //       ; 
    //     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    //     var d = R * c; // Distance in km
    //     return d;
    //   }

    //   function deg2rad(deg) {
    //     return deg * (Math.PI/180)
    //   }
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}