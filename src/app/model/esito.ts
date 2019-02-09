export class Esito {
    private codice: string;
    private descrizione: string;

    constructor(codice?: string, descrizione?: string) {
        this.codice = codice;
        this.descrizione = descrizione;
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
