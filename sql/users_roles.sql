DROP TABLE IF EXISTS users_roles;

CREATE TABLE IF NOT EXISTS users_roles (
    user_role_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);


insert into users_roles (
    user_id,
    role_id
) values (
    1,
    1
);

insert into users_roles (
    user_id,
    role_id
) values (
    1,
    2
);

insert into users_roles (
    user_id,
    role_id
) values (
    1,
    3
);