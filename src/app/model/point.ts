
export class VgiPoint {

    id: number;
    longitude: number;
    latitude: number;
    descrizione: string;

    constructor(longitude: number, latitude: number, descrizione: string){
        this.longitude = longitude;
        this.latitude = latitude;
        this.descrizione = descrizione;
    }


}