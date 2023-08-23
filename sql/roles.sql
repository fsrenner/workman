DROP TABLE IF EXISTS roles;

CREATE TABLE IF NOT EXISTS roles (
    role_id serial primary key,
    user_role varchar(50),
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into roles (
    user_role
) values (
    'admin'
);

insert into roles (
    user_role
) values (
    'manager'
);

insert into roles (
    user_role
) values (
    'reader'
);

insert into roles (
    user_role
) values (
    'general_user'
);