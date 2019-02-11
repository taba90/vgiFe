export class Esito {
    codice: string;
    descrizione: string;

    constructor(esito?: Esito) {
        this.codice = esito.codice;
        this.descrizione = esito.descrizione;
    }

    getCodice (): string {
        return this.codice;
    }

    setCodice (codice: string) {
        this.codice = codice;
    }

    getDescrizione (): string {
        return this.descrizione;
    }

    setDescrizione (descrizione: string) {
        this.descrizione = descrizione;
    }
}
