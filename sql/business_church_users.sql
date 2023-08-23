DROP TABLE IF EXISTS business_church_users;

CREATE TABLE IF NOT EXISTS business_church_users (
    business_church_user_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(business_id) ON DELETE CASCADE,
    church_id INTEGER REFERENCES churches(church_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into business_church_users (
    business_id,
    user_id,
    church_id
) values (
    1,
    1,
    1
);