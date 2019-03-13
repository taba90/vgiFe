import { Legenda } from './legenda';



export class VgiPoint {

    id: number;
    nome: string;
    longitude: number;
    latitude: number;
    descrizione: string;
    idLegenda: number;
    location: any;
    legenda: Legenda;


    constructor(point?: VgiPoint) {
        if (point != null) {
            this.id = point.id;
            this.longitude = point.longitude;
            this.latitude = point.latitude;
            this.descrizione = point.descrizione;
            this.idLegenda = point.idLegenda;
            this.location = point.location;
        }

    }


}
