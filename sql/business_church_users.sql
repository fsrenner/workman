CREATE TABLE IF NOT EXISTS business_church_users (
    business_user_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(business_id) ON DELETE CASCADE,
    church_id INTEGER REFERENCES churches(church_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);

insert into business_church_users (
    business_id,
    user_id,
    church_id,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    1,
    1,
    1,
    now(),
    1,
    null,
    null
);