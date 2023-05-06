import { session } from "./session.repository";

class RoleService {

    private readonly baseUrl = 'http://192.168.15.130:3000/roles';

    public async getList(): Promise<any[]> {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(this.baseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }

        return [];
    }

    public async get(roleId: number) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${roleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async create(role: any) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            },
            body: JSON.stringify(role)
        }); 2

        if (response.status === 201) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async update(role: any) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${role.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            },
            body: JSON.stringify(role)
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

    public async delete(userId: number) {
        const logged = await session.getLoggedUser();
        if (!logged) throw new Error('Sessão expirada!');

        const response = await fetch(`${this.baseUrl}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${logged.token}`
            }
        });

        if (response.status === 200) {
            return await response.json();

        } else if (response.status === 401) {
            throw new Error(await response.json());
        }
        return null;
    }

}

export const roleService = new RoleService();