DROP TABLE IF EXISTS churches;

CREATE TABLE IF NOT EXISTS churches (
    church_id SERIAL PRIMARY KEY,
    church_name VARCHAR(100),
    denomination VARCHAR(100),
    description TEXT,
    website VARCHAR(50),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(50),
    zip INTEGER,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into churches (
    church_name,
    denomination,
    description,
    email,
    phone_number,
    address,
    city,
    state,
    zip
) values (
    'Reformed Bible Church',
    null,
    'A Reformed Protestant Church in Branson West, MO',
    'reformedbiblechurchtrl@gmail.com',
    '4179731225',
    '18943-H Business Hwy 13',
    'Branson West',
    'MO',
    65737
);
