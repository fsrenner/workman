CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(50),
    zip INTEGER,
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login TIMESTAMP,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
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
    verified,
    last_login,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'fsteverenner',
    'f.steve.renner@gmail.com',
    'HotKatie2008',
    'Steve',
    'Renner',
    '1979-01-19',
    '4179731225',
    '256 Old Still Rd',
    'Kimberling City',
    65686,
    TRUE,
    null,
    now(),
    1,
    null,
    null
);

