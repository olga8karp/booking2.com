export class PropertyData {
    constructor(
        public address: string = '',
        public description = '',
        public facilities: string[] = [],
        public meals: string[] = [],
        public name: string = '',
        public numberOfGuests: number = 2,
        public price: number = null,
        public propertyRating: number = 0,
        public propertyType: string = 'hotel',
        public uploads: string[] = [],
        public bookedDates?: any[],
        public timestamp?: number
    ) {}
}

export interface Address {
    formatted_address: string;
}

