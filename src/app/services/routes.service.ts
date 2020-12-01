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
      new RoutePoint("Bordj Badji Mokhtar (Algeria)", { lat: 21.3304477, lng: 0.9480148 }),
      new RoutePoint("Bordj Badji Mokhtar -> Reggane (Algeria)", { lat: 24.3716383, lng: 0.1679293 }),
      new RoutePoint("Reggane (Algeria)", { lat: 26.7175979, lng: 0.17319925 }),
      new RoutePoint("Sali (Algeria)", { lat: 26.9630999, lng: -0.0128082 }),
      new RoutePoint("Tamentit (Algeria)", { lat: 27.8387324, lng: -0.2831488 }),
      new RoutePoint("Sba (Algeria)", { lat: 28.2163620, lng: -0.1698729 }),
      new RoutePoint("Oufrane (Algeria)", { lat: 28.540317, lng: 0.1815535 }),
      new RoutePoint("Aougrout (Algeria)", { lat: 28.9082039, lng: 0.5535173 }),
      new RoutePoint("Timimoun (Algeria)", { lat: 29.6800992, lng: 0.5004194 }),
      new RoutePoint("El Menia (Algeria)", { lat: 30.6159489, lng: 2.8764183 }),
      new RoutePoint("Ouargla (Argelia)", { lat: 32.364684, lng: 3.794979 }),
      new RoutePoint("Ghardaia (Algeria)", { lat: 32.4919113, lng: 3.6424292 }),
      new RoutePoint("Ghardaia (Algeria)", { lat: 32.6404129, lng: 3.7125580 }),
      new RoutePoint("Hassi R'Mel (Algeria)", { lat: 32.9416880, lng: 3.2686365 }),
      new RoutePoint("Kheneg (Algeria)", { lat: 33.7540670, lng: 2.8195293 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.8068432, lng: 2.8635879 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.823625669841896, lng: 2.8734652189405008 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.843936587873806, lng: 2.873825449966568 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.86682722793626, lng: 2.8321481683390872 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.84452176212199, lng: 2.7994304600666835 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 33.86482609319781, lng: 2.6940594660352213 }),
      new RoutePoint("Laghouat (Algeria)", { lat: 34.17692578748168, lng: 2.5324891302027517 }),
      new RoutePoint("Oued Morra (Algeria)", { lat: 34.20796224442654, lng: 2.322766353475507 }),
      new RoutePoint("Aflou (Algeria)", { lat: 34.12281861929919, lng: 2.0961237462917346 }),
      new RoutePoint("Gueltat Sidi Saad (Algeria)", { lat: 34.300409433995675, lng: 1.9489054920600655 }),
      new RoutePoint("Ain Deheb (Algeria)", { lat: 34.85920369205166, lng: 1.5357202053146877 }),
      new RoutePoint("Chehaima (Algeria)", { lat: 34.893524481301526, lng: 1.2983629069240317 }),
      new RoutePoint("Frenda (Algeria)", { lat: 35.05507369245714, lng: 1.0573037774204137 }),
      new RoutePoint("Medroussa (Algeria)", { lat: 35.18880404422612, lng: 1.1547195715395082 }),
      new RoutePoint("Tiaret (Algeria)", { lat: 35.384416698718894, lng: 1.3048588691923075 }),
      new RoutePoint("Tissemsilt (Algeria)", { lat: 35.617373980391434, lng: 1.822745090209188 }),
      new RoutePoint("Bou Aiche (Algeria)", { lat: 35.54744310629043, lng: 2.3620632345192827 }),
      new RoutePoint("Sebt Aziz (Algeria)", { lat: 35.83517018045016, lng: 2.4558267171985055 }),
      new RoutePoint("Berrouaghia (Algeria)", { lat: 36.13239553664049, lng: 2.930773446118726 }),
      new RoutePoint("Beni Slimane (Algeria)", { lat: 36.23888309045133, lng: 3.296191907706667 }),
      new RoutePoint("Tablat (Algeria)", { lat: 36.41304544267137, lng: 3.2974900011468145 }),
      new RoutePoint("Larbaa (Algeria)", { lat: 36.58442444156101, lng: 3.159073587778386 }),
      new RoutePoint("Algiers (Algeria)", { lat: 36.6973193451561, lng: 3.0589989239961475 }),
      new RoutePoint("Boufarik (Algeria)", { lat: 36.58503920705156, lng: 2.912942190556394 }),
      new RoutePoint("Mouzaia (Algeria)", { lat: 36.486112818333844, lng: 2.656590784257255 }),
      new RoutePoint("Boumedfaa (Algeria)", { lat: 36.363449322766584, lng: 2.4598329059296735 }),
      new RoutePoint("Khemis Miliana (Algeria)", { lat: 36.264774453416805, lng: 2.2325741253492897 }),
      new RoutePoint("Rouina (Algeria)", { lat: 36.244452895977574, lng: 1.8029983147662496 }),
      new RoutePoint("Oued Fodda (Algeria)", { lat: 36.18945224189526, lng: 1.5366026913984285 }),
      new RoutePoint("Oum Drou (Algeria)", { lat: 36.197393974002374, lng: 1.3989944231201021 }),
      new RoutePoint("Djidiouia (Algeria)", { lat: 35.929987321622036, lng: 0.8281396971529719 }),
      new RoutePoint("Souaflia (Algeria)", { lat: 35.85525057014421, lng: 0.3332308099471911 }),
      new RoutePoint("Mansoura (Algeria)", { lat: 35.84123239811893, lng: 0.236554965393279 }),
      new RoutePoint("Ain Nouissy (Algeria)", { lat: 35.80059969687217, lng: 0.05438614651001601 }),
      new RoutePoint("Stidia (Algeria)", { lat: 35.828241444455365, lng: -0.003917577264483602 }),
      new RoutePoint("Sidi Mansour Beach (Algeria)", { lat: 35.788871954382316, lng: -0.09611243020888499 }),
      new RoutePoint("Mers El Hadjadj (Algeria)", { lat: 35.78652066205681, lng: -0.16657016005684677 }),
      new RoutePoint("Ain Bia (Algeria)", { lat: 35.80281896341838, lng: -0.293326491517353 }),
      new RoutePoint("Gdyel (Algeria)", { lat: 35.781982291676535, lng: -0.424339397108246 }),
      new RoutePoint("Oran (Argelia)", { lat: 35.6994659, lng: -0.6480423 }),
      new RoutePoint("Es Senia (Algeria)", { lat: 35.650711291306614, lng: -0.5924105299140445 }),
      new RoutePoint("Sidi Chami (Algeria)", { lat: 35.656089091919675, lng: -0.5211593646371256 }),
      new RoutePoint("Oued Tlelat (Algeria)", { lat: 35.552863002294764, lng: -0.44908973803131286 }),
      new RoutePoint("Oued Tlelat (Algeria)", { lat: 35.537800762711726, lng: -0.44347261614855105 }),
      new RoutePoint("Tafraoui (Algeria)", { lat: 35.48931244553217, lng: -0.5190958133905589 }),
      new RoutePoint("Tamzoura (Algeria)", { lat: 35.408773645311385, lng: -0.6570661999810962 }),
      new RoutePoint("Oued Sabah (Algeria)", { lat: 35.374643680906495, lng: -0.8171972182036379 }),
      new RoutePoint("Sidi Boumediene (Algeria)", { lat: 35.312771017195104, lng: -0.8683064009443556 }),
      new RoutePoint("Aghlal (Algeria)", { lat: 35.197258039311336, lng: -1.0743014553107386 }),
      new RoutePoint("Sebah Chioukh (Algeria)", { lat: 35.15365651450072, lng: -1.356233684049614 }),
      new RoutePoint("Remchi (Algeria)", { lat: 35.06075239697234, lng: -1.4287031279928526 }),
      new RoutePoint("Fellaoucene (Algeria)", { lat: 35.03654565369841, lng: -1.5974702746016738 }),
      new RoutePoint("Sidi El Machehour (Algeria)", { lat: 34.90534851440736, lng: -1.7303277949540816 }),
      new RoutePoint("Maghnia (Argelia)", { lat: 34.851040376186525, lng: -1.7295401703461062 }),
      new RoutePoint("Oujda (Marruecos)", { lat: 34.68276517522681, lng: -1.904969495134061 }),
      new RoutePoint("Jerada (Marruecos)", { lat: 34.32887877552556, lng: -2.1603949338397714 }),
      new RoutePoint("Merija (Marruecos)", { lat: 34.02891659228345, lng: -2.3796262150500893 }),
      new RoutePoint("Debdou (Marruecos)", { lat: 33.99553477707873, lng: -3.0372575232672983 }),
      new RoutePoint("Taza (Marruecos)", { lat: 34.24550676547994, lng: -3.9950649406554377 }),
      new RoutePoint("Taounat (Marruecos)", { lat: 34.535123281581136, lng: -4.62978291704886 }),
      new RoutePoint("Kharia Be Mohammed (Marruecos)", { lat: 34.35766965976912, lng: -5.204619485663292 }),
      new RoutePoint("Sidi Kacem (Marruecos)", { lat: 34.22239083989823, lng: -5.722099490859353 }),
      new RoutePoint("Sidi Yahya El Gharb (Marruecos)", { lat: 34.30296025970705, lng: -6.312055468170336 }),
      new RoutePoint("Kenitra (Marruecos)", { lat: 34.25434904178267, lng: -6.580571278989429 }),
      new RoutePoint("Rabat (Marruecos)", { lat: 33.9959988216047, lng: -6.819630834343373 }),
      new RoutePoint("Temara (Marruecos)", { lat: 33.91462403031632, lng: -6.897089017085536 }),
      new RoutePoint("Skhirat (Marruecos)", { lat: 33.8590784698715, lng: -7.0650087116458655 }),
      new RoutePoint("Mohammedia (Marruecos)", { lat: 33.68766269662946, lng: -7.377090421518624 }),
      new RoutePoint("Casablanca (Marruecos)", { lat: 33.58637535342546, lng: -7.592103319828422 }),
      new RoutePoint("Settat (Marruecos)", { lat: 33.013888272827366, lng: -7.590557979634003 }),
      new RoutePoint("Ben Guerrir (Marruecos)", { lat: 32.19823014403383, lng: -7.95522471260276 }),
      new RoutePoint("Marrakesh (Marruecos)", { lat: 31.64816274275896, lng: -7.998717607781348 }),
      new RoutePoint("Mtouga (Marruecos)", { lat: 31.56830190982994, lng: -8.229446046084048 }),
      new RoutePoint("Imintanoute (Marruecos)", { lat: 31.172224100426533, lng: -8.848890108525904 }),
      new RoutePoint("N8 Road (Marruecos)", { lat: 31.107179814997032, lng: -9.01060451978689 }),
      new RoutePoint("Tazidra (Marruecos)", { lat: 31.015261989795846, lng: -9.048180567234244 }),
      new RoutePoint("Sinit (Marruecos)", { lat: 30.742234210781035, lng: -9.23631151584212 }),
      new RoutePoint("Tassademt (Marruecos)", { lat: 30.681198370976926, lng: -9.238346662242627 }),
      new RoutePoint("Amskroud (Marruecos)", { lat: 30.53014700937618, lng: -9.33007912249973 }),
      new RoutePoint("Ait Melloul (Marruecos)", { lat: 30.335198261756876, lng: -9.492559957635638 }),
      new RoutePoint("Belfaa (Marruecos)", { lat: 30.062488847829627, lng: -9.508676689977294 }),
      new RoutePoint("Guelmim (Marruecos)", { lat: 28.98621681928308, lng: -10.070877761005029 }),
      new RoutePoint("Tantan (Marruecos)", { lat: 28.431789338118083, lng: -11.085259362003756 }),
      new RoutePoint("El Ouatia (Marruecos)", { lat: 28.47945464003201, lng: -11.334258672011728 }),
      new RoutePoint("Khnifiss National Park (Marruecos)", { lat: 27.894059829152837, lng: -12.368614419772378 }),
      new RoutePoint("Tarfaya (Marruecos)", { lat: 27.93088384484356, lng: -12.92188522863155 }),
      new RoutePoint("Laayoune (Western Sahara)", { lat: 27.15044263437957, lng: -13.226545167840708 }),
      new RoutePoint("Lamsid (Western Sahara)", { lat: 26.676616025037784, lng: -13.585020542497356 }),
      new RoutePoint("Boujdour (Western Sahara)", { lat: 26.12543442274237, lng: -14.438835910242144 }),
      new RoutePoint("Boujdour (Western Sahara)", { lat: 24.66483459488293, lng: -14.866357765262096 }),
      new RoutePoint("Dakhla (Western Sahara)", { lat: 23.893337386456274, lng: -15.674205877766974 }),
      new RoutePoint("Dakhla (Western Sahara)", { lat: 23.925101945699478, lng: -15.771622274788172 }),
      new RoutePoint("Dakhla (Western Sahara)", { lat: 23.81422527302941, lng: -15.895497967395336 }),
      new RoutePoint("Dakhla (Western Sahara)", { lat: 23.748725578113206, lng: -15.921332084875402 }),
      new RoutePoint("Dakhla (Western Sahara)", { lat: 23.72906612251307, lng: -15.950710323835434 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 23.797102508859712, lng: -15.980204652170492 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 23.912569448915587, lng: -15.945042673218481 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 24.346405507628695, lng: -15.86731446036418 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 24.612151886870258, lng: -15.875205530204017 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 25.11491831908299, lng: -15.739419898849032 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 25.350450033121017, lng: -15.442482407555284 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 25.66073450575547, lng: -15.305925421688348 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 25.95247075697011, lng: -15.127490544059144 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 26.26204680851937, lng: -14.88583469234234 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 26.63022878016137, lng: -14.772712485756784 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 26.905363203896417, lng: -14.547180327135843 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.11696202828029, lng: -14.405464035794212 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.309927912111576, lng: -14.295862521042249 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.62552083895426, lng: -14.243717852251146 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.802377077072748, lng: -14.23798680568636 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.876861921462552, lng: -14.288853488067037 }),
      new RoutePoint("Dakhla (Western Sahara) -> Fuerteventura (España)", { lat: 27.988070909857765, lng: -14.339093206737044 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.044302034124893, lng: -14.336008903903558 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.088544186140584, lng: -14.293764165307776 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.10239183886696, lng: -14.276084995610852 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.116213875142297, lng: -14.279468862354278 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.14861082313837, lng: -14.250592320112348 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.16597736379004, lng: -14.234674050101102 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.235788075533282, lng: -14.09373974945514 }),
      new RoutePoint("Fuerteventura (España)", { lat: 28.498103702253076, lng: -13.86150094089053 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 28.50757714936484, lng: -13.809353331480624 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 28.563664023344966, lng: -13.728817713216044 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 28.617290692496184, lng: -13.559941257832598 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 28.751039715503914, lng: -13.313283543589536 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 29.10917392920823, lng: -12.69855185991059 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 29.866661695416266, lng: -12.214642886636137 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 30.558013571438046, lng: -11.505386060009794 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 31.682373031397184, lng: -11.301093788663074 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 32.565122060921645, lng: -10.321149883241814 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 33.349120547508896, lng: -9.674471982909404 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 34.263631348794355, lng: -9.266762742222857 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.114925761919714, lng: -8.848438217083185 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.297450299613, lng: -8.130965909442294 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.62429501568178, lng: -7.336471897732693 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.61920762238899, lng: -6.8869749728547704 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.73305707209334, lng: -6.486630034659772 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.93127151688576, lng: -6.271942576599695 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.95425293469082, lng: -5.936568804285485 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 35.98250732850958, lng: -5.495948381244322 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.05912912808755, lng: -5.256545886869138 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.178243791210605, lng: -4.894399087187756 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.24933162119016, lng: -4.758410821021642 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.33940352369042, lng: -4.668183402857002 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.38230081201145, lng: -4.53469386443658 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.45520958784013, lng: -4.470733652343543 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.52631132622381, lng: -4.42988792842153 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.56676373682739, lng: -4.415719180235522 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.61480245194904, lng: -4.413783723482474 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.64022698953526, lng: -4.415634330141215 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.67072197469921, lng: -4.416320148225293 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.69038769624062, lng: -4.416662389513018 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.69954010808938, lng: -4.417003892673929 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.7104593710259, lng: -4.4167935050874325 }),
      new RoutePoint("Fuerteventura -> Málaga (España)", { lat: 36.71458632768377, lng: -4.416598751995653 }),
      new RoutePoint("Málaga (España)", { lat: 36.7162981044559, lng: -4.4191724845630365 }),
      new RoutePoint("Vélez-Málaga (España)", { lat: 36.772867967457174, lng: -4.102960116436919 }),
      new RoutePoint("Nerja (España)", { lat: 36.762778288237946, lng: -3.869152500043002 }),
      new RoutePoint("Almería (España)", { lat: 36.8494132232717, lng: -2.462588165440476 }),
      new RoutePoint("Bolnuevo (España)", { lat: 37.60926713548968, lng: -1.343344603869148 }),
      new RoutePoint("Cartagena (España)", { lat: 37.61368137192969, lng: -0.9666047010251115 }),
      new RoutePoint("Alicante (España)", { lat: 38.380032132849124, lng: -0.5258863921747456 }),
      new RoutePoint("Valencia (España)", { lat: 39.50657899441197, lng: -0.37356478247085523 }),
      new RoutePoint("Peniscola (España)", { lat: 40.42286541911779, lng: 0.333912275324572 }),
      new RoutePoint("Tortosa (España)", { lat: 40.795847880284, lng: 0.5256360879693434 }),
      new RoutePoint("Tarragona (España)", { lat: 41.10784958056267, lng: 1.18467988568418 }),
      new RoutePoint("El Prat de Llobregat (España)", { lat: 41.333788951641104, lng: 2.0936690481482283 }),
      new RoutePoint("Barcelona (España)", { lat: 41.374982824427526, lng: 2.149272474252563 }),
    ];
    return of(routes);
  }
}