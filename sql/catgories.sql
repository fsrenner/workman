DROP TABLE IF EXISTS categories;

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT, 
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

INSERT INTO categories (
    category_name,
    description
) VALUES (
    'Food and Drink',
    'Encompassing category for all things having to do with food and drink: restaurants, grocery stores, breweries, wineries, and others'
);