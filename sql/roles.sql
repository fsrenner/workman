CREATE TABLE IF NOT EXISTS roles (
    role_id serial primary key,
    user_role varchar(50),
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);

insert into roles (
    user_role,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'admin',
    now(),
    1,
    null,
    null
);

insert into roles (
    user_role,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'manager',
    now(),
    1,
    null,
    null
);

insert into roles (
    user_role,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'reader',
    now(),
    1,
    null,
    null
);