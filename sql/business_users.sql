CREATE TABLE IF NOT EXISTS business_users (
    business_user_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(business_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into business_users (
    business_id,
    user_id
) values (
    1,
    1
);