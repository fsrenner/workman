DROP TABLE IF EXISTS businesses;

CREATE TABLE IF NOT EXISTS businesses (
    business_id SERIAL PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
    description TEXT,
    email VARCHAR(100),
    website VARCHAR(50),
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


insert into businesses (
    business_name,
    description,
    email,
    phone_number,
    address,
    city,
    state,
    zip
) values (
    'Old Still Brewing Company and Distillery',
    'A craft brewery and distillery in Kimberling City, MO',
    'osbcd@gmail.com',
    '4179731225',
    '256 Old Still Rd',
    'Kimberling City',
    'MO',
    65686
);
