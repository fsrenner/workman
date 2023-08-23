DROP TABLE IF EXISTS church_users;

CREATE TABLE IF NOT EXISTS church_users (
    church_users_id SERIAL PRIMARY KEY,
    church_id INTEGER REFERENCES churches(church_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into church_users (
    church_id,
    user_id
) values (
    1,
    1
);
