import {CarClass} from "../enums/car-class.enum";

export interface ICar {
    name: string;
    class: CarClass;
    fuelTankSize: number;
}
