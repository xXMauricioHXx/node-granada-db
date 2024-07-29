import pg from 'pg';

export class PostgresConnection {
  async getConnection(): Promise<pg.Client> {
    const { Client } = pg;
    const client = new Client({
      host: 'localhost',
      user: 'postgres',
      password: 'postgres',
      database: 'grafanadb',
      port: 5432,
    });
    await client.connect();

    return client;
  }
}
