
export class User {
    username: string;
    password: string;
    email: string;

    constructor(username?: string, password?: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    getUsername(): string {
        return this.username;
    }

    setUsername (username: string) {
        this.username = username;
    }

    getPassword(): string {
        return this.password;
    }

    setPassword (password: string) {
        this.password = password;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail (email: string) {
        this.email = email;
    }
}
