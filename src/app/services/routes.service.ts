import { Injectable } from '@angular/core';
import { RoutePoint } from '@model/route-point';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutesService {
  constructor() { }

  getFullRoute(): Observable<RoutePoint[]> {
    let routes: RoutePoint[] = [
      new RoutePoint("Fiaso / Forikrom (Ghana)", { lat: 7.5947192, lng: -1.8634536 }, 1),
      new RoutePoint("Techiman (Ghana)", { lat: 7.5896856, lng: -1.9512214 }, 2),
      new RoutePoint("Kumasi (Ghana)", { lat: 6.690251, lng: -1.6861465 }, 3),
      new RoutePoint("Tema (Ghana)", { lat: 5.6852424, lng: -0.0236622 }, 4),
      new RoutePoint("Bolgatanga (Ghana)", { lat: 10.7934454, lng: -0.8955796 }, 5),
      new RoutePoint("Niamey (Níger)", { lat: 13.512926, lng: 2.0489922 }, 6),
      new RoutePoint("Agadez (Níger)", { lat: 16.9690028, lng: 7.9693448 }, 7),
      new RoutePoint("Isir (Libia)", { lat: 23.6025489, lng: 14.1038323 }, 8),    // fake point, need to find the correct one
      new RoutePoint("Barragat (Libia)", { lat: 25.202339, lng: 12.266484 }, 9),  // fake point, need to find the correct one
      new RoutePoint("Ghat (Libia)", { lat: 24.9623426, lng: 10.1616551 }, 10),
      new RoutePoint("Alawenat (Libia)", { lat: 25.7735344, lng: 10.5430124 }, 11),
      new RoutePoint("Ubari (Libia)", { lat: 26.584886, lng: 12.7642582 }, 12),
      new RoutePoint("Sabha (Libia)", { lat: 27.0316398, lng: 14.3551962 }, 13),
      new RoutePoint("Tripoli (Libia)", { lat: 32.8829717, lng: 13.1708262 }, 14),
      new RoutePoint("Misrata (Libia)", { lat: 32.341875, lng: 15.107541 }, 15), // intermediate point added to draw it better
      new RoutePoint("Abugrein (Libia)", { lat: 31.453434, lng: 15.261001 }, 16), // intermediate point added to draw it better
      new RoutePoint("Sirte (Libia)", { lat: 31.200745, lng: 16.571920 }, 17), // intermediate point added to draw it better
      new RoutePoint("Ras Lanuf (Libia)", { lat: 30.481301, lng: 18.539726 }, 18), // intermediate point added to draw it better
      new RoutePoint("Bishr (Libia)", { lat: 30.257451, lng: 19.202176 }, 19), // intermediate point added to draw it better
      new RoutePoint("Ajdabiya (Libia)", { lat: 30.263279, lng: 19.185870 }, 20), // intermediate point added to draw it better
      new RoutePoint("Ajdabiya (Libia)", { lat: 30.761204, lng: 20.219228 }, 21), // intermediate point added to draw it better
      new RoutePoint("Benghazi (Libia)", { lat: 32.0814853, lng: 19.9949157 }, 22),
      new RoutePoint("Tobruk (Libia)", { lat: 32.0731577, lng: 23.9201712 }, 23),
      new RoutePoint("Al Bayda (Libia)", { lat: 32.762872, lng: 21.748015 }, 24), // intermediate point added to draw it better
      new RoutePoint("Benghazi (Libia)", { lat: 32.0814853, lng: 19.9949157 }, 25),
      new RoutePoint("Awjilah", { lat: 29.177884, lng: 21.336878 }, 1),  // intermediate point added to draw it better
      new RoutePoint("Maradah (Libia)", { lat: 29.215654, lng: 19.205641 }, 2),  // intermediate point added to draw it better
      new RoutePoint("Waddan (Libia)", { lat: 29.235141, lng: 16.103951 }, 2),  // intermediate point added to draw it better
      new RoutePoint("Tripoli (Libia)", { lat: 32.8829717, lng: 13.1708262 }, 19),
      new RoutePoint("Ghadames (Libia)", { lat: 30.1307602, lng: 9.478197 }, 19),
      new RoutePoint("Túnez", { lat: 33.8095826, lng: 5.0687704 }, 19),
      new RoutePoint("Ouargla (Argelia)", { lat: 32.1805293, lng: 4.6419643 }, 19),
      new RoutePoint("Tamanrasset (Argelia)", { lat: 22.7907229, lng: 5.5177423 }, 3),
      new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }, 4),
      new RoutePoint("Abalessa (Argelia)", { lat: 22.938180, lng: 4.884270 }, 3),  // intermediate point added to draw it better
      new RoutePoint("Tamanrasset (Argelia)", { lat: 22.7907229, lng: 5.5177423 }, 3),
      new RoutePoint("Zelfana (Argelia)", { lat: 32.433797, lng: 4.199097 }, 19), // intermediate point added to draw it better
      new RoutePoint("Ouargla (Argelia)", { lat: 32.1805293, lng: 4.6419643 }, 19),
      new RoutePoint("Maghnia (Argelia)", { lat: 34.8496246, lng: -2.0538249 }, 19),
      new RoutePoint("Casablanca (Marruecos)", { lat: 33.5724108, lng: -7.657032 }, 19),
      new RoutePoint("Rabat (Marruecos)", { lat: 33.9693414, lng: -6.9273029 }, 19),
      new RoutePoint("Nouakchott (Mauritania)", { lat: 18.0671201, lng: -16.0936509 }, 19),
      new RoutePoint("Fuerteventura (España)", { lat: 28.4007635, lng: -14.4463875 }, 5),
      new RoutePoint("Málaga (España)", { lat: 36.7183391, lng: -4.5193069 }, 5),
      new RoutePoint("Barcelona (España)", { lat: 41.3948976, lng: 2.0787279 }, 5)

    ];
    return of(routes);
  }
}