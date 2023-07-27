CREATE TABLE IF NOT EXISTS user_roles (
    user_role_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);


insert into user_roles (
    user_id,
    role_id,
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