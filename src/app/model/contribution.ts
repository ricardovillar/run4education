import { SportEnum } from '@model/sport.enum';

export class Contribution {
    public id: string;

    constructor(
        public firstName: string,
        public lastName: string,
        public country: string,
        public distance: number,
        public valuePerKm: number,
        public sport: SportEnum,
        public avatar: File
    ) {
        this.id = firstName + "-" + lastName;
    }
}