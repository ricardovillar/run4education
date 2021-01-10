import { SportEnum } from '@model/sport.enum';

export class Contribution {
    public futureCommunicationConsent: boolean;
    public country: string;
    public city: string;

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public distance: number,
        public valuePerKm: number,
        public sport: SportEnum,
        public avatar: File
    ) {
    }
}