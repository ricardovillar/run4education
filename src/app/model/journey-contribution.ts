import { SportEnum } from '@model/sport.enum';

export class JourneyContribution {
    public _id: string;
    public sport: SportEnum;
    public avatarUrl: string;
    public isCompany: boolean;

    constructor(
        public firstName: string,
        public lastName: string,
        public distance: number
    ) {
        this._id = firstName + "-" + lastName;
        this.isCompany = false;
    }
}