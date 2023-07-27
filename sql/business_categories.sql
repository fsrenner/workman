CREATE TABLE IF NOT EXISTS business_categories (
    business_category_id SERIAL PRIMARY KEY,
    business_id INTEGER REFERENCES businesses(business_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER NOT NULL DEFAULT 1,
    updated_date TIMESTAMP,
    updated_by INTEGER
);

insert into business_categories (
    business_id,
    category_id,
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