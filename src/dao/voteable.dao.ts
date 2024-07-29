import pg from 'pg';

export type Voteable = {
  id: number;
  name: string;
  role_id: number;
  sequential_number: number;
};

export class VoteableDAO {
  constructor(private readonly connection: pg.Client) {}

  async save(
    id: number,
    name: string,
    roleId: number,
    sequentialNumber: string
  ): Promise<void> {
    await this.connection.query(
      `INSERT INTO voteable(id, name, role_id, sequential_number) VALUES($1, $2, $3, $4)`,
      [id, name, roleId, sequentialNumber]
    );
  }

  async findById(id: number): Promise<Voteable | null> {
    const result = await this.connection.query<Voteable>(
      `SELECT * FROM voteable WHERE id = $1`,
      [id]
    );

    return result?.rows.length ? result.rows[0] : null;
  }
}
