import { DATABASE } from 'src/constants';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: DATABASE.host,
  port: DATABASE.port,
  username: DATABASE.username,
  password: DATABASE.password,
  database: DATABASE.database,
  entities: [],
  migrations: ['migrations/*.ts'],
});
