exports.GET_CHURCHES = 'SELECT * FROM churches';
exports.GET_CHURCHES_BY_ID = 'SELECT * FROM churches WHERE church_id = $1';
exports.CREATE_CHURCH = `
  INSERT INTO churches (
    church_name,
    denomination,
    description,
    email,
    website,
    phone_number,
    address,
    city,
    state,
    zip,
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
    CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    $11,
    null,
    null
  ) RETURNING *
`;
exports.DELETE_CHURCH_BY_ID = 'DELETE FROM churches WHERE church_id = $1';
