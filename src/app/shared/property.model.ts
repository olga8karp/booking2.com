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
    propertyId?: string;
}

export class Address {
    // tslint:disable-next-line: variable-name
    formatted_address: string;
}
