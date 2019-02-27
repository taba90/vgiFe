export class Message {

    constructor(testo?: string, color?: string)  {
        if (testo !== null) {
            this.testo = testo;
        }
        if (color !== null) {
            this.color = color;
        }
    }

    testo: string;
    color: string;
}
