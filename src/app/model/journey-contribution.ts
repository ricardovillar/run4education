import { SportEnum } from '@model/sport.enum';

export class JourneyContribution {
    public id: string;
    public sport: SportEnum;
    public pictureUrl: string;
    public isCompany: boolean;

    constructor(
        public firstName: string,
        public lastName: string,
        public distance: number
    ) {
        this.id = firstName + "-" + lastName;
        this.isCompany = false;
    }
}