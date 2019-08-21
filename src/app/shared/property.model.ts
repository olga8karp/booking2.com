export class Property {
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
    name: string;
    numberOfGuests: string;
    parking: true | '';
    petFriendly: true | '';
    price: number;
    propertyRating: string;
    propertyType: string;
    restaurant: true | '';
    swimmingPool: true | '';
    constructor(address: Address[],
                breakfast: true | '',
                chargingStation: true | '',
                dinner: true | '',
                file1: string,
                file2: string,
                file3: string,
                file4: string,
                file5: string,
                fitnessCenter: true | '',
                kitchen: true | '',
                lunch: true | '',
                name: string,
                numberOfGuests: string,
                parking: true | '',
                petFriendly: true | '',
                price: number,
                propertyRating: string,
                propertyType: string,
                restaurant: true | '',
                swimmingPool: true | '') {
        this.address = address;
        this.breakfast = breakfast;
        this.chargingStation = chargingStation;
        this.dinner = dinner;
        this.file1 = file1;
        this.file2 = file2;
        this.file3 = file3;
        this.file4 = file4;
        this.file5 = file5;
        this.fitnessCenter = fitnessCenter;
        this.kitchen = kitchen;
        this.lunch = lunch;
        this.name = name;
        this.numberOfGuests = numberOfGuests;
        this.parking = parking;
        this.petFriendly = petFriendly;
        this.price = price;
        this.propertyRating = propertyRating;
        this.propertyType = propertyType;
        this.restaurant = restaurant;
        this.swimmingPool = swimmingPool;
    }
}

interface Address {
    // tslint:disable-next-line: variable-name
    long_name: string;
    // tslint:disable-next-line: variable-name
    short_name: string;
    types: string[];
}
