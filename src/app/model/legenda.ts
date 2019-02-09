export class Legenda {

    id: number;
    codice: string;
    descrizione: string;
    active: boolean;

    constructor(legenda?: Legenda) {

    }

    getCodice(): string {
        return this.codice;
    }
    setCodice(codice: string) {
        this.codice = codice;
    }

    getDescrizione(): string {
        return this.descrizione;
    }
    setDescrizione(descrizione: string) {
        this.descrizione = descrizione;
    }

    isActive (): boolean {
        return this.active;
    }

    setActive (active: boolean) {
        this.active = active;
    }

    getId (): number {
        return this.id;
    }

    setId(id: number) {
        this.id = id;
    }
}
