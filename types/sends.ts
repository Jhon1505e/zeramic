export interface ILocation {
    locationCode: string;
    locationName: string;
}
export interface IDeparment {
    departmentCode: string;
    departmentOrStateName: string;
}

export interface IData extends ILocation, IDeparment { }

export interface IEnvio {
    deliveryCompanyImgUrl: string;
    deliveryCompanyName: string;
    routeType: string;
    insurancePercentage: number;
    shippingCost: number;
}