import { Client } from "pg";

const client: Client = new Client({
  user: 'renato',
  password: '123456',
  host: 'localhost',
  database: 'm4_s2_movies_rpgouveia',
  port: 5432
});

const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log('Database connected');
};

export {
  client,
  startDatabase
};