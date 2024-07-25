import { DataSource } from 'typeorm';
import { migrations } from '.';

export default new DataSource({
  type: 'postgres',
  username: process.env.DATABASE_USER,
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME,
  port: Number(process.env.POSTGRES_PORT),
  host: process.env.POSTGRES_HOST,
  migrations: migrations,
  migrationsTableName: `migrations`,
});
