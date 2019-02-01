export class Legenda {

    private id: number;
    private codice: string;
    private descrizione: string;
    private active: boolean;

    constructor(codice?: string, descrizione?: string, active?: boolean) {

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
