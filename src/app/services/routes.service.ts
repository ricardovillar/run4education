import { Injectable } from '@angular/core';
import { RoutePoint } from '@model/route-point';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoutesService {
  constructor() { }

  getFullRoute(): Observable<RoutePoint[]> {
    let routes: RoutePoint[] = [
      new RoutePoint("Fianso (Ghana)", { lat: 7.5769373, lng: -1.810956 }),
      new RoutePoint("Forikrom (Ghana)", { lat: 7.5947192, lng: -1.8634536 }),
      new RoutePoint("Techiman (Ghana)", { lat: 7.5896856, lng: -1.9512214 }),
      new RoutePoint("Kumasi (Ghana)", { lat: 6.690251, lng: -1.6861465 }),
      new RoutePoint("Accra (Ghana)", { lat: 5.5912045, lng: -0.2497708 }),
      new RoutePoint("Tema (Ghana)", { lat: 5.6852424, lng: -0.0236622 }, "donde vio el mar por 1a vez podemos hacer vídeo de ousman en la playa"),
      new RoutePoint("Amedzofe (Ghana)", { lat: 6.8456911, lng: 0.4288146 }),
      new RoutePoint("Jasikan (Ghana)", { lat: 7.4094088, lng: 0.4429721 }),
      new RoutePoint("Nkwanta (Ghana)", { lat: 8.2593134, lng: 0.501809 }),
      new RoutePoint("Gushiegu (Ghana)", { lat: 9.9230716, lng: -0.2280522 }),
      new RoutePoint("Walewale (Ghana)", { lat: 10.3491379, lng: -0.8071303 }),
      new RoutePoint("Tongo (Ghana)", { lat: 10.7063424, lng: -0.8118082 }),
      new RoutePoint("Bolgatanga (Ghana)", { lat: 10.7934454, lng: -0.8955796 }),
      new RoutePoint("Zabré (Burkina Faso)", { lat: 11.1890531, lng: -0.6426574 }),
      new RoutePoint("Ouargaye (Burkina Faso)", { lat: 11.509262, lng: 0.0404046 }),
      new RoutePoint("Fada-Ngourma (Burkina Faso)", { lat: 12.0661165, lng: 0.347539 }),
      new RoutePoint("Kantchari (Burkina Faso)", { lat: 12.4787446, lng: 1.5114006 }),
      new RoutePoint("Kobadie (Níger)", { lat: 13.2165882, lng: 1.8637716 }),
      new RoutePoint("Niamey (Níger)", { lat: 13.512926, lng: 2.0489922 }),
      new RoutePoint("Koure (Níger)", { lat: 13.3263996, lng: 2.5527686 }),
      new RoutePoint("Dosso (Níger)", { lat: 13.0466586, lng: 3.1851762 }),
      new RoutePoint("Sokoto (Nigeria)", { lat: 13.0322426, lng: 5.1578201 }),
      new RoutePoint("Gwadabawa (Nigeria)", { lat: 13.3547168, lng: 5.2289966 }),
      new RoutePoint("Illiea (Nigeria)", { lat: 13.729567, lng: 5.2894234 }),
      new RoutePoint("Birnin Konni (Níger)", { lat: 13.7932078, lng: 5.2438407 }),
      new RoutePoint("Tsernaoua (Níger)", { lat: 13.8916089, lng: 5.3396022 }),
      new RoutePoint("Dabnou (Níger)", { lat: 14.1572781, lng: 5.3474879 }),
      new RoutePoint("Tahoua (Níger)", { lat: 14.8983292, lng: 5.2516339 }),
      new RoutePoint("Abalak (Níger)", { lat: 15.4592429, lng: 6.2724852 }),
      new RoutePoint("Marandet (Níger)", { lat: 16.4405509, lng: 7.4974179 }),
      new RoutePoint("Agadez (Níger)", { lat: 16.9690028, lng: 7.9693448 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 17.1148548, lng: 8.0816667 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 17.195693, lng: 8.0963625 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 17.7378475, lng: 7.9654285 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 17.7023481, lng: 7.9993974 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 18.3224012, lng: 7.7626909 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 18.7390917, lng: 7.3730276 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 19.3339488, lng: 5.7691903 }),
      new RoutePoint("Agadez (Níger) -> Hoggar Mountains (Algeria)", { lat: 23.0631336, lng: 5.3709624 }),
      new RoutePoint("Hoggar Mountains (Algeria)", { lat: 23.2898107, lng: 5.5276102 }),
      new RoutePoint("Idlès (Algeria)", { lat: 23.8175025, lng: 5.925021 }),
      new RoutePoint("N55 Road (Algeria)", { lat: 24.5791619, lng: 6.6867658 }),
      new RoutePoint("Bordj El Haouas (Algeria)", { lat: 24.4923423, lng: 6.6827768 }),
      new RoutePoint("Djanet (Libia)", { lat: 23.8335795, lng: 8.6975132 }),
      // new RoutePoint("Isir (Libia)", { lat: 23.6025489, lng: 14.1038323 }),    // fake point, need to find the correct one
      // new RoutePoint("Barragat (Libia)", { lat: 25.202339, lng: 12.266484 }),  // fake point, need to find the correct one
      new RoutePoint("Ghat (Libia)", { lat: 24.9623426, lng: 10.1616551 }),
      new RoutePoint("Alawenat (Libia)", { lat: 25.9834999, lng: 11.1586573 }),
      new RoutePoint("Awbari (Libia)", { lat: 26.2823569, lng: 11.9760203 }),
      new RoutePoint("Germa (Libia)", { lat: 26.2823569, lng: 11.9760203 }),
      new RoutePoint("Germa (Libia)", { lat: 26.3543271, lng: 13.1468313 }),
      new RoutePoint("Dujal (Libia)", { lat: 26.1282574, lng: 13.6864972 }),
      new RoutePoint("Murzuq (Libia)", { lat: 25.9160567, lng: 13.9113198 }),
      new RoutePoint("Taraghin (Libia)", { lat: 25.9375518, lng: 14.4079255 }),
      new RoutePoint("Sabha (Libia)", { lat: 27.0316398, lng: 14.3551962 }),
      new RoutePoint("Samnu (Libia)", { lat: 27.2436274, lng: 14.8612828 }),
      new RoutePoint("Samnu - nearby (Libia)", { lat: 27.9690999, lng: 15.2490128 }),
      new RoutePoint("Samnu - nearby (Libia)", { lat: 27.9690999, lng: 15.2490128 }),
      new RoutePoint("Sawknah - nearbh (Libia)", { lat: 28.5958173, lng: 15.0518023 }),
      new RoutePoint("Sawknah (Libia)", { lat: 28.5958173, lng: 15.0518023 }),
      new RoutePoint("Waddan (Libia)", { lat: 28.7171216, lng: 15.3041282 }),
      new RoutePoint("Waddan (Libia)", { lat: 29.235141, lng: 16.103951 }),
      new RoutePoint("Maradah (Libia)", { lat: 29.215654, lng: 19.205641 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah (Libia)", { lat: 29.177884, lng: 21.336878 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah to Tobruk (Libia)", { lat: 29.5872113, lng: 21.9073219 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah to Tobruk (Libia)", { lat: 31.3246136, lng: 22.0783258 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah to Tobruk (Libia)", { lat: 31.3535257, lng: 22.1661087 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah to Tobruk (Libia)", { lat: 31.5406624, lng: 22.5725676 }),  // intermediate point added to draw it better
      new RoutePoint("Awjilah to Tobruk (Libia)", { lat: 31.8760403, lng: 23.7775764 }),  // intermediate point added to draw it better
      new RoutePoint("Tobruk (Libia)", { lat: 32.0731577, lng: 23.9201712 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.0348202, lng: 23.3828724 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.2231127, lng: 23.1855397 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.3368325, lng: 23.044448 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.4558059, lng: 23.0692103 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.6012299, lng: 22.7558783 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.7376682, lng: 22.6146599 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.7316921, lng: 22.5204466 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.8130824, lng: 22.1693128 }),
      new RoutePoint("Tobruk -> Benghazi (Libia)", { lat: 32.512907, lng: 20.8702018 }),
      new RoutePoint("Benghazi (Libia)", { lat: 32.1231068, lng: 20.1573854 }),
      new RoutePoint("Benghazi - nearby (Libia)", { lat: 31.6602245, lng: 20.288307 }),
      new RoutePoint("Benghazi - nearby (Libia)", { lat: 31.5142827, lng: 20.2329281 }),
      new RoutePoint("Ajdabiya (Libia)", { lat: 30.761204, lng: 20.219228 }), // intermediate point added to draw it better
      new RoutePoint("Ajdabiya - nearby (Libia)", { lat: 30.4974493, lng: 19.9221643 }), // intermediate point added to draw it better
      new RoutePoint("Ajdabiya - nearby (Libia)", { lat: 30.1655998, lng: 19.5463057 }), // intermediate point added to draw it better
      new RoutePoint("Bishr (Libia)", { lat: 30.257451, lng: 19.202176 }), // intermediate point added to draw it better
      new RoutePoint("Bishr (Libia)", { lat: 30.2385269, lng: 18.9861533 }), // intermediate point added to draw it better
      new RoutePoint("Ras Lanuf (Libia)", { lat: 30.481301, lng: 18.539726 }), // intermediate point added to draw it better
      new RoutePoint("Ben Jawad (Libia)", { lat: 30.7285202, lng: 17.9802043 }), // intermediate point added to draw it better
      new RoutePoint("Mintaqat Wadi Harawah (Libia)", { lat: 31.0664053, lng: 17.2603939 }), // intermediate point added to draw it better
      new RoutePoint("Sirte (Libia)", { lat: 31.200745, lng: 16.571920 }), // intermediate point added to draw it better
      new RoutePoint("Sirte - nearby (Libia)", { lat: 31.2163608, lng: 15.93939 }), // intermediate point added to draw it better
      new RoutePoint("Abugrein (Libia)", { lat: 31.453434, lng: 15.261001 }), // intermediate point added to draw it better
      new RoutePoint("Misrata (Libia)", { lat: 32.341875, lng: 15.107541 }), // intermediate point added to draw it better
      new RoutePoint("Tripoli (Libia)", { lat: 32.8829717, lng: 13.1708262 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 32.5583, lng: 12.7944449 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 32.5583, lng: 12.7944449 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 32.5583, lng: 12.7944449 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 32.1373249, lng: 12.481176 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 32.0282875, lng: 11.789162 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 31.9689629, lng: 11.2348269 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 31.9689629, lng: 11.2348269 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 31.8856447, lng: 11.0137989 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 30.8956091, lng: 10.4975428 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 30.4375878, lng: 10.3689736 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 30.4375878, lng: 10.3689736 }),
      new RoutePoint("Tripoli - Ghadames (Libia)", { lat: 30.4375878, lng: 10.3689736 }),
      new RoutePoint("Ghadames (Libia)", { lat: 30.1307602, lng: 9.478197 }),
      new RoutePoint("Borj El Khadra (Túnez)", { lat: 30.2509851, lng: 9.548178 }),
      new RoutePoint("Borj El Khadra (Túnez) -> Ouargla (Argelia)", { lat: 31.1983677, lng: 7.7415185 }),
      new RoutePoint("Borj El Khadra (Túnez) -> Ouargla (Argelia)", { lat: 31.6291528, lng: 6.8042783 }),
      new RoutePoint("Borj El Khadra (Túnez) -> Ouargla (Argelia)", { lat: 31.6291528, lng: 6.8042783 }),
      new RoutePoint("Borj El Khadra (Túnez) -> Ouargla (Argelia)", { lat: 31.8537269, lng: 5.6395636 }),
      new RoutePoint("Ouargla (Argelia)", { lat: 32.1805293, lng: 4.6419643 }, "nos van subiendo por muchas ciudades ,cada día a una distinta Asamasaud era una de ellas donde me pegaron mucho. Podemos hacer un vídeo de ousman"),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 30.159253, lng: 5.0149579 }),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 28.5405888, lng: 5.4711307 }),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 26.856643, lng: 4.400080 }),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 24.453029, lng: 2.966275 }),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 23.748761, lng: 3.524294 }),
      new RoutePoint("Ouargla -> Tamanrasset (Argelia)", { lat: 22.651969, lng: 2.548545 }),
      new RoutePoint("Tamanrasset -> Boughessa (Argelia)", { lat: 20.201037, lng: 2.629973 }),
      new RoutePoint("Boughessa (Argelia)", { lat: 20.0184558, lng: 2.2541929 }),
      new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),

      //new RoutePoint("Assamakka (Mali)", { lat: 19.3339437, lng: 5.7670069 }, "Assamakka"),

      // new RoutePoint("Tessalit (Mali) -> Ouargla (Argelia)", { lat: 20.2579848, lng: 0.9865814 }),
      // new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),
      // new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),
      // new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),
      // new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),
      // new RoutePoint("Tessalit (Mali)", { lat: 20.2579848, lng: 0.9865814 }),



      new RoutePoint("Ouargla (Argelia)", { lat: 32.364684, lng: 3.794979 }),
      new RoutePoint("Maghnia (Argelia)", { lat: 34.8496246, lng: -2.0538249 }),
      new RoutePoint("Casablanca (Marruecos)", { lat: 33.5724108, lng: -7.657032 }),
      new RoutePoint("Rabat (Marruecos)", { lat: 33.9693414, lng: -6.9273029 }),
      new RoutePoint("Nouakchott (Mauritania)", { lat: 18.0671201, lng: -16.0936509 }, "hacer vídeo con Abdul ,compañero de patera de ousman. Vive en santa coloma, eder a él."),
      new RoutePoint("Fuerteventura (España)", { lat: 28.4007635, lng: -14.4463875 }),
      new RoutePoint("Málaga (España)", { lat: 36.7183391, lng: -4.5193069 }),
      new RoutePoint("Barcelona (España)", { lat: 41.3948976, lng: 2.0787279 })

    ];
    return of(routes);
  }
}