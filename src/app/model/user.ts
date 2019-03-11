
export class User {
    username: string;
    password: string;
    email: string;
    anni: number;

    constructor(username?: string, password?: string, email?: string, anni?: number) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.anni = anni;
    }

}
