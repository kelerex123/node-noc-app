import { envs} from "./envs.plugin"


describe('envs.plugin.ts', () => {

    test('should return options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'superbraw2000@gmail.com',
            MAILER_SECRET_KEY: 'bujrrygamufhssxw',
            MAILER_SERVICE: 'gmail',
            PROD: false,
            MONGO_URL: 'mongodb://bryan:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'bryan',
            MONGO_PASS: '123456789'
        })
        
    });

    test('should return error if not found env', async() => {
        
        jest.resetModules();
        
        process.env.PORT = "AAAA";
        try {
            await import('./envs.plugin');

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }


    })

})