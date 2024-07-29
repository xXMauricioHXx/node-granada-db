CREATE TABLE city (
  id BIGINT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE role (
  id BIGINT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE voteable (
  id BIGINT NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role_id BIGINT NOT NULL,
  sequential_number VARCHAR(12) NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE voting_location  (
  id BIGINT NOT NULL PRIMARY key,
  name VARCHAR(500) NOT NULL,
  description VARCHAR(500) NOT NULL
);

CREATE TABLE voting (
  id BIGSERIAL PRIMARY KEY,
  voting_code BIGINT NOT null,
  turn INT NOT NULL,
  country VARCHAR(2) NOT NULL,
  city_id BIGINT NOT NULL,
  zone INT NOT NULL,
  section INT NOT NULL,
  role_id BIGINT NOT NULL,
  voteable_id BIGINT NOT NULL,
  votes_quantity INT NOT NULL,
  voting_location_id BIGINT NOT NULL,
  year INT NOT NULL,
  FOREIGN KEY (city_id) REFERENCES city(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (voteable_id) REFERENCES voteable(id),
  FOREIGN KEY (voting_location_id) REFERENCES voting_location(id)
)