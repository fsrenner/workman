DROP TABLE IF EXISTS business_categories;

CREATE TABLE IF NOT EXISTS business_categories (
    business_category_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(business_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date BIGINT NOT NULL DEFAULT CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    created_by INTEGER NOT NULL DEFAULT 0,
    updated_date BIGINT,
    updated_by INTEGER
);

insert into business_categories (
    business_id,
    category_id
) values (
    1,
    1
);