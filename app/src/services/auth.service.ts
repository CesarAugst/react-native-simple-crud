import { session } from "./session.repository";

class AuthService {

    private readonly baseUrl = 'http://192.168.15.130:3000/auth/login';

    public async login(username: string, password: string): Promise<any> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 201) {
            const logged = await response.json();
            await session.setLoggedUser(logged);
            return logged;
        }

        return null;
    }

}

export const authService = new AuthService();