import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export class PropertyData {
  constructor(
    public address: string = "",
    public description = "",
    public facilities: string[] = [],
    public meals: string[] = [],
    public name: string = "",
    public numberOfGuests: number = 2,
    public price: number = null,
    public propertyRating: number = 0,
    public propertyType: string = "hotel",
    public uploads: string[] = [],
    public bookedDates?: any[],
    public timestamp?: number
  ) {}
}

export type PriceRange =
  | [0, 56]
  | [56, 110]
  | [110, 160]
  | [160, 220]
  | [220, null];

export class SearchInputPropertyData {
  constructor(
    public facilities: string[] = [],
    public meals: string[] = [],
    public numberOfGuests: number = 2,
    public priceRange: PriceRange = null,
    public propertyRating: number = 0,
    public propertyType: string = null,
    public dates?: NgbDate[],
    public searchTerm: string = ""
  ) {}
}

export interface Address {
  formatted_address: string;
}
