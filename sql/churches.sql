CREATE TABLE IF NOT EXISTS churches (
    church_id SERIAL PRIMARY KEY,
    church_name VARCHAR(100),
    denomination VARCHAR(100),
    description TEXT,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(200),
    city VARCHAR(50),
    state VARCHAR(50),
    zip INTEGER,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
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
    zip,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'Reformed Bible Church',
    null,
    'A Reformed Protestant Church in Branson West, MO',
    'reformedbiblechurchtrl@gmail.com',
    '4179731225',
    '18943-H Business Hwy 13',
    'Branson West',
    'MO',
    65737,
    now(),
    1,
    null,
    null
);
