export class Legenda {

    id: number;
    codice: string;
    descrizione: string;
    active: boolean;
    colore: string;

    constructor(legenda?: Legenda) {
        if (legenda != null) {
            this.id = legenda.id;
            this.codice = legenda.codice;
            this.descrizione = legenda.descrizione;
            this.active = legenda.active;
        }
    }

}
