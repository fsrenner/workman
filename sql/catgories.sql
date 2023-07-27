CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT, 
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);

insert into categories (
    category_name,
    description,
    created_date,
    created_by,
    updated_date,
    updated_by
) values (
    'Food and Drink',
    'Encompassing category for all things having to do with food and drink: restaurants, grocery stores, breweries, wineries, and others',
    now(),
    1,
    null,
    null
);