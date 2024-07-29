import pg from 'pg';

export type Role = {
  id: number;
  name: string;
};

export class RoleDAO {
  constructor(private readonly connection: pg.Client) {}

  async save(id: number, name: string): Promise<void> {
    await this.connection.query(`INSERT INTO role(id, name) VALUES($1, $2)`, [
      id,
      name,
    ]);
  }

  async findById(id: number): Promise<Role | null> {
    const result = await this.connection.query<Role>(
      `SELECT * FROM role WHERE id = $1`,
      [id]
    );

    return result?.rows.length ? result.rows[0] : null;
  }
}
