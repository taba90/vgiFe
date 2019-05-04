export class Search {
    annoDa: number;
    annoA: number;
    idLegenda: number;

    constructor (annoDa?: number, annoA?: number, idLegenda?: number) {
        if (annoDa !== null) {
            this.annoDa = annoDa;
        }
        if (annoA !== null) {
            this.annoA = annoA;
        }
        if (idLegenda !== null) {
            this.idLegenda = idLegenda;
        }
    }
}
