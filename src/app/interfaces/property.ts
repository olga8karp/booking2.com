export interface Property {
    address: Address[];
    breakfast: true | '';
    chargingStation: true | '';
    dinner: true | '';
    file1: string;
    file2: string;
    file3: string;
    file4: string;
    file5: string;
    fitnessCenter: true | '';
    kitchen: true | '';
    lunch: true | '';
    numberOfGuests: string;
    parking: true | '';
    petFriendly: true | '';
    price: number;
    propertyRating: string;
    propertyType: string;
    restaurant: true | '';
    swimmingPool: true | '';
}

interface Address {
    long_name: string;
    short_name: string;
    types: string[];
}
