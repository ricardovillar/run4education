import { SportEnum } from '@model/sport.enum';

export class Contribution {

    constructor(
        public firstName: string,
        public lastName: string,
        public country: string,
        public distance: number,
        public valuePerKm: number,
        public sport: SportEnum,
        public avatar: File
    ) {
    }
}