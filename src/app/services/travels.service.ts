import { Injectable } from '@angular/core';
import { Travel } from '@app/model/travel';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TravelsService {
  constructor() { }

  getAllTravels(): Observable<Travel[]> {
    let travels: Travel[] = [
      new Travel("Ousman", 50),
      new Travel("Ricardo", 5),
      new Travel("Thaís", 30),
      new Travel("Felix", 8),
      new Travel("Jordi", 19)
    ];
    return of(travels);
  }
}