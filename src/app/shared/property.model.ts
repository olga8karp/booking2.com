import { Timestamp } from 'rxjs/internal/operators/timestamp';

export class Property {
    address: Address[];
    breakfast: true | '';
    chargingStation: true | '';
    dinner: true | '';
    fitnessCenter: true | '';
    kitchen: true | '';
    lunch: true | '';
    name: string;
    numberOfGuests: string;
    parking: true | '';
    petFriendly: true | '';
    price: number;
    propertyRating: string;
    propertyType: string;
    restaurant: true | '';
    swimmingPool: true | '';
    description: string;
    uploads: string[];
    bookedDates?: any[];
    propertyId?: string;
    timestamp?: number;
}

export interface Address {
    formatted_address: string;
}


export interface NgbDate {
    day: number;
    month: number;
    year: number;
}
