import request from 'supertest';
import App from '../../../../src/app';
import MongoConnection from '../../../../src/db'
import {Express} from 'express';

describe('Test user.route.ts', () => {
    let server: Express;
    let idUserCreated: number;
    let accessToken: string;

    beforeAll(()=>{
        const mongoConnection: MongoConnection = MongoConnection.getInstance();
        const app = new App();
        server = app.server;
    });

    test('Save User', async () => {
        const user = {
            'email': 'baracus@gmail.com',
            'password': 'work3'
        }
        const res = await request(server)
            .post('/api/users')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(200);

        idUserCreated = res.body._id;
        expect(res.body.email).toBe('baracus@gmail.com');
    });

    test('Login User', async () => {
        const user = {
            'email': 'baracus@gmail.com',
            'password': 'work3'
        }
        const res = await request(server)
            .post('/api/login')
            .set('Content-Type', 'application/json')
            .send(user)
            .expect(200);

        accessToken = res.body.accessToken;
        expect(res.body.user.email).toBe('baracus@gmail.com');
    });

    test('Get All Users', async () => {
        const res = await request(server).get('/api/users')
            .set('Authorization', `Bearer ${accessToken}`);

        const users = res.body;
        expect(users.length).toBeGreaterThan(0);
    });

    test('Get One User', async () => {
        const res = await request(server).get('/api/users/' + idUserCreated)
        .set('Authorization', `Bearer ${accessToken}`);
        const user = res.body;
        expect(user.email).toBe('baracus@gmail.com');
    });

    test('Update One User', async () => {
        const user = {
            'email': 'update@gmail.com'
        }
        const res = await request(server).put('/api/users/' + idUserCreated)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(user)
            .expect(200);

        expect(res.body.email).toBe('update@gmail.com');
    });

    test('Delete One User', async () => {
        const del = await request(server).delete('/api/users/' + idUserCreated)
            .set('Authorization', `Bearer ${accessToken}`);

        const res = await request(server).get('/api/users/' + idUserCreated)
            .set('Authorization', `Bearer ${accessToken}`);

        
        expect(del.body).toStrictEqual({
            message: 'success'
        });

        expect(res.body).toBe(null);
    });

    test('Delete Non-Existend User', async () => {
        const idUser = '000000000000000000000000';
        const del = await request(server).delete('/api/users/' + idUser)
            .set('Authorization', `Bearer ${accessToken}`)
            .expect(404);

        expect(del.body).toStrictEqual({
            message: 'User does not exist'
        });
    });

    test('Update Non-Existend User', async () => {
        const idUser = '000000000000000000000000';

        const user = {
            'email': 'update@gmail.com'
        }
        const res = await request(server).put('/api/users/' + idUserCreated)
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${accessToken}`)
            .send(user)
            .expect(404);

        expect(res.body).toStrictEqual({
            message: 'User does not exist'
        });
    });
});