import { RoutePoint } from './route-point';
import { SportEnum } from '@model/sport.enum';

export class JourneyContribution {
    public _id: string;
    public sport: SportEnum;
    public avatarUrl: string;

    public isCompany: boolean;
    public companyId: string;

    public isGroup: boolean;
    public groupName: string;
    public groupParticipants: string;

    public initialKm: number;
    public finalKm: number;
    public initialRoutePoint: RoutePoint;
    public finalRoutePoint: RoutePoint;

    constructor(
        public firstName: string,
        public lastName: string,
        public distance: number
    ) {
        this.isCompany = false;
        this.isGroup = false;
    }
}