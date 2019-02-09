import { Esito } from './esito';

export class Result<T> {

    result: T;

    results: T[];

    esito: Esito;

    constructor(result?: Result<T>) {
        if (result != null) {
            this.result = result.result;
            this.results = result.results;
            this.esito = result.esito;
        }
    }

    getEsito(): Esito {
        return this.getEsito();
    }

    getResult(): T {
        return this.result;
    }

    getResults(): T[] {
        return this.results;
    }

    setEsito(esito: Esito): void {
        this.esito = esito;
    }

    setResult(t: T) {
        this.result = t;
    }

    setResults(t: T[]) {
        this.results = t;
    }


}
