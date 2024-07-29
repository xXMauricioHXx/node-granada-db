import pg from 'pg';

export type City = {
  id: number;
  name: string;
};

export class CityDAO {
  constructor(private readonly connection: pg.Client) {}

  async save(id: number, name: string): Promise<void> {
    await this.connection.query(`INSERT INTO city(id, name) VALUES($1, $2)`, [
      id,
      name,
    ]);
  }

  async findById(id: number): Promise<City | null> {
    const result = await this.connection.query<City>(
      `SELECT * FROM city WHERE id = $1`,
      [id]
    );
    return result?.rows.length ? result.rows[0] : null;
  }
}
