import pg from 'pg';

export type Voting = {
  id: number;
  voting_code: number;
  turn: number;
  country: string;
  city_id: number;
  zone: number;
  section: number;
  role_id: number;
  voteable_id: number;
  votes_quantity: number;
  voting_location_id: number;
  year: number;
};

export class VotingDAO {
  constructor(private readonly connection: pg.Client) {}

  async save(data: Omit<Voting, 'id'>): Promise<void> {
    await this.connection.query(
      `INSERT INTO voting(voting_code, turn, country, city_id, zone, section, role_id, voteable_id, votes_quantity, voting_location_id, year) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        data.voting_code,
        data.turn,
        data.country,
        data.city_id,
        data.zone,
        data.section,
        data.role_id,
        data.voteable_id,
        data.votes_quantity,
        data.voting_location_id,
        data.year,
      ]
    );
  }

  async findById(id: number): Promise<Voting | null> {
    const result = await this.connection.query<Voting>(
      `SELECT * FROM voting WHERE id = $1`,
      [id]
    );

    return result?.rows.length ? result.rows[0] : null;
  }
}
