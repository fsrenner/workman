CREATE TABLE IF NOT EXISTS businesses (
    business_id SERIAL PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
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


insert into businesses (
    business_name,
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
    'Old Still Brewing Company and Distillery',
    'A craft brewery and distillery in Kimberling City, MO',
    'osbcd@gmail.com',
    '4179731225',
    '256 Old Still Rd',
    'Kimberling City',
    'MO',
    65686,
    now(),
    1,
    null,
    null
);
