import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3360,
                username: 'root',
                password: '1234',
                database: 'SIGESC',
                entities: [__dirname + '/../**/*.entity.{ts,js}'],
                synchronize: false,
            });
            return dataSource.initialize();
        },
    },
];