import { Legenda } from './legenda';

export class VgiPoint {

    private id: number;
    private longitude: number;
    private latitude: number;
    private descrizione: string;
    private idLegenda: number;

    constructor(longitude?: number, latitude?: number, descrizione?: string) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.descrizione = descrizione;
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

    getLegenda (): number {
        return this.idLegenda;
    }

    setLegenda (legenda: number) {
        this.idLegenda = legenda;
    }
}
