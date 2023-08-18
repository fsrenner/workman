exports.GET_BUSINESSES = 'SELECT * FROM businesses';
exports.GET_BUSINESSES_BY_ID =
  'SELECT * FROM businesses WHERE business_id = $1';
exports.CREATE_BUSINESS = `
  INSERT INTO businesses (
    business_name,
    description,
    email,
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
    now(),
    $9,
    null,
    null
  ) RETURNING *
`;
exports.DELETE_BUSINESS_BY_ID = 'DELETE FROM businesses WHERE business_id = $1';
