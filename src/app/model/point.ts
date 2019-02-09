import { Legenda } from './legenda';

export class VgiPoint {

    private id: number;
    longitude: number;
    latitude: number;
    descrizione: string;
    idLegenda: number;


    constructor(point?: VgiPoint) {
        if (point != null) {
            this.longitude = point.longitude;
            this.latitude = point.latitude;
            this.descrizione = point.descrizione;
            this.idLegenda = point.idLegenda;
        }

    }

    getId (): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }

    getLongitude (): number {
        return this.longitude;
    }

    setLongitude (longitude: number) {
        this.longitude = longitude;
    }

    getLatitude (): number {
        return this.latitude;
    }

    setLatitude (latitude: number) {
        this.latitude = latitude;
    }

    getDescrizione (): string {
        return this.descrizione;
    }

    setDescrizione (descrizione: string) {
        this.descrizione = descrizione;
    }

    getIdLegenda (): number {
        return this.idLegenda;
    }

    setIdLegenda (idLegenda: number) {
        this.idLegenda = idLegenda;
    }


}
