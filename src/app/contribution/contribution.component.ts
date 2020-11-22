import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Travel } from '@model/travel';
import { addTravel } from '@store/actions/map/map.actions';

import * as fromStore from "@store/reducers/index";
import { Router } from '@angular/router';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {

  sponsor: string;
  distance: number;


  constructor(
    private store: Store<fromStore.State>,
    private router: Router) { }

  ngOnInit(): void {
  }


  add() {
    if (this.sponsor && this.distance) {
      let travel = new Travel(this.sponsor, this.distance);
      this.store.dispatch(addTravel({ travel }));
      this.router.navigate(['']);
    }
  }

}
