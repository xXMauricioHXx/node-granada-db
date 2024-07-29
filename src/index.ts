import fs from 'fs';
import csvParse from 'csv-parser';
import { CityDAO } from './dao/city.dao';
import { PostgresConnection } from './dao/connect';
import { RoleDAO } from './dao/role.dao';
import { VoteableDAO } from './dao/voteable.dao';
import { VotingLocationDAO } from './dao/voting-location.dao';
import { VotingDAO } from './dao/voting.dao';

setImmediate(async () => {
  const connection = await new PostgresConnection().getConnection();
  const cityDao = new CityDAO(connection);
  const roleDao = new RoleDAO(connection);
  const voteableDao = new VoteableDAO(connection);
  const votingLocationDao = new VotingLocationDAO(connection);
  const votingDao = new VotingDAO(connection);

  let index = 1;

  fs.createReadStream('./migration.csv')
    .pipe(
      csvParse({
        separator: ';',
      })
    )
    .on('data', async (row) => {
      console.log(`----------- Processing row --------------`);
      const cityName = row.NM_MUNICIPIO;
      const cityId = Number(row.CD_MUNICIPIO);

      const roleId = Number(row.CD_CARGO);
      const roleName = row.DS_CARGO;

      const voteableId = Number(row.NR_VOTAVEL);
      const voteableName = row.NM_VOTAVEL;
      const voteableSequentialNumber = row.SQ_CANDIDATO;

      const votingLocationId = Number(row.NR_LOCAL_VOTACAO);
      const votingLocationName = row.NM_LOCAL_VOTACAO;
      const votingLocationDescription = row.DS_LOCAL_VOTACAO_ENDERECO;

      const country = row.SG_UF;
      const section = Number(row.NR_SECAO);
      const zone = Number(row.NR_ZONA);
      const turn = Number(row.NR_TURNO);
      const votesQuantity = Number(row.QT_VOTOS);
      const votingCode = Number(row.CD_ELEICAO);
      const year = Number(row.ANO_ELEICAO);

      console.log(`Searching city by id=${cityId}`);
      let foundCity = await cityDao.findById(cityId);
      console.log(foundCity);
      if (!foundCity) {
        console.log(`Saving city with id=${cityId} and name=${cityName}`);
        await cityDao.save(cityId, cityName);
      }

      console.log(`Searching role by id=${roleId}`);
      const foundRole = await roleDao.findById(roleId);
      if (!foundRole) {
        console.log(`Saving role with id=${roleId} and name=${roleName}`);
        await roleDao.save(roleId, roleName);
      }

      console.log(`Searching voteable by id=${voteableId}`);
      const foundVoteable = await voteableDao.findById(voteableId);
      if (!foundVoteable) {
        console.log(
          `Saving voteable with id=${voteableId}, name=${voteableName}, roleId=${roleId} and sequentialNumber=${voteableSequentialNumber}`
        );
        await voteableDao.save(
          voteableId,
          voteableName,
          roleId,
          voteableSequentialNumber
        );
      }

      console.log(`Searching voting local by id=${votingLocationId}`);
      const foundVotingLocal = await votingLocationDao.findById(
        votingLocationId
      );
      if (!foundVotingLocal) {
        console.log(
          `Saving voting with id=${votingLocationId}, name=${votingLocationName}, description=${votingLocationDescription}`
        );
        await votingLocationDao.save(
          votingLocationId,
          votingLocationName,
          votingLocationDescription
        );
      }

      console.log(`Saving voting\n\n`);
      await votingDao.save({
        city_id: cityId,
        country,
        role_id: roleId,
        section,
        zone,
        turn,
        voteable_id: voteableId,
        votes_quantity: votesQuantity,
        voting_code: votingCode,
        voting_location_id: votingLocationId,
        year,
      });

      index++;
    })
    .on('end', async () => {
      console.log('\n\nFile processed!');
    })
    .on('error', (error) => {
      console.error('Error reading CSV file:', error);
    });
});
