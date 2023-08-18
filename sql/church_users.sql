CREATE TABLE IF NOT EXISTS church_users (
    church_users_id SERIAL PRIMARY KEY,
    church_id INTEGER REFERENCES churches(church_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);

insert into church_users (
    church_id,
    user_id,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    1,
    1,
    now(),
    1,
    null,
    null
);
