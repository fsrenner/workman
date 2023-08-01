// User Queries
exports.GET_USERS = `
    SELECT 
        username,
        email,
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        address,
        city,
        state,
        zip,
        country,
        last_login,
        created_date,
        created_by,
        updated_date,
        updated_by
    FROM users`;

exports.GET_USER_BY_ID = `
  SELECT 
    username,
    email,
    first_name,
    last_name,
    date_of_birth,
    phone_number,
    address,
    city,
    state,
    zip,
    country,
    last_login,
    created_date,
    created_by,
    updated_date,
    updated_by
  FROM users 
  WHERE user_id = $1
`;

exports.GET_USER_BY_USERNAME = `SELECT * FROM users WHERE username = $1`;

exports.GET_EMAIL_OF_USERS = `SELECT email FROM users`;

exports.CREATE_USER = `
    INSERT INTO users (
        username,
        email,
        password_hash,
        first_name,
        last_name,
        date_of_birth,
        phone_number,
        address,
        city,
        state,
        zip,
        country,
        last_login,
        created_date,
        created_by,
        updated_date,
        updated_by
    ) VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        null,
        now(),
        $13,
        null,
        null
    ) RETURNING *;`;

exports.VERIFY_USER = `
    UPDATE users
    SET verified = TRUE
    WHERE user_id = $1;`;

exports.UPDATE_USER_LOGIN = `
    UPDATE users
    SET last_login = now()
    WHERE user_id = $1;`;

exports.DELETE_USER = `DELETE FROM users WHERE user_id = $1;`;
