import pg from 'pg';

export type VotingLocation = {
  id: number;
  name: string;
  description: string;
};

export class VotingLocationDAO {
  constructor(private readonly connection: pg.Client) {}

  async save(id: number, name: string, description: string): Promise<void> {
    await this.connection.query(
      `INSERT INTO voting_location(id, name, description) VALUES($1, $2, $3)`,
      [id, name, description]
    );
  }

  async findById(id: number): Promise<VotingLocation | null> {
    const result = await this.connection.query<VotingLocation>(
      `SELECT * FROM voting_location WHERE id = $1`,
      [id]
    );

    return result?.rows.length ? result.rows[0] : null;
  }
}
