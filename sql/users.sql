DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth BIGINT,
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(50),
    zip INTEGER NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login BIGINT,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);


insert into users (
    username,
    email,
    password_hash,
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address,
    city,
    state,
    zip,
    verified
) values (
    'fsteverenner',
    'f.steve.renner@gmail.com',
    'HotKatie2008',
    'Steve',
    'Renner',
    285552000,
    '4179731225',
    '256 Old Still Rd',
    'Kimberling City',
    'MO',
    65686,
    TRUE
);

