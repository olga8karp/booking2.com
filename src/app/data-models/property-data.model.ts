export class PropertyData {
    constructor(
        public address: string = '',
        public breakfast: boolean = false,
        public chargingStation: boolean = false,
        public description = '',
        public dinner: boolean = false,
        public fitnessCenter: boolean = false,
        public kitchen: boolean = false,
        public lunch: boolean = false,
        public name: string = '',
        public numberOfGuests: number = 2,
        public parking: boolean = false,
        public petFriendly: boolean = false,
        public price: number = null,
        public propertyRating: string = 'unrated',
        public propertyType: string = 'hotel',
        public restaurant: boolean = false,
        public swimmingPool: boolean = false,
        public uploads: string[] = [],
        public bookedDates?: any[],
        public timestamp?: number
    ) {}
}

export interface Address {
    formatted_address: string;
}

