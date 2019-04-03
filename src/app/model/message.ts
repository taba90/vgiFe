export class Message {

    constructor(testo?: string, cssClass?: string)  {
        if (testo !== null) {
            this.testo = testo;
        }
        if (cssClass !== null) {
            this.cssClass = cssClass;
        }
    }

    testo: string;
    cssClass: string;
}
