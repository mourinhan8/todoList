import { DataSource } from 'typeorm';
import config from './appConfig';

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: config.db.database,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
});

export default AppDataSource;