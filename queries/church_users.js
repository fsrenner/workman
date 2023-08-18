exports.GET_CHURCH_USER = 'SELECT * FROM church_users';

exports.GET_CHURCH_USERS_BY_ID = `
  SELECT *
  FROM church_users
  WHERE church_user_id = $1
`;

exports.GET_CHURCH_USERS_BY_USER_ID = `
  SELECT *
  FROM church_users
  WHERE user_id = $1
`;

exports.GET_CHURCH_USERS_BY_CHURCH_ID = `
  SELECT *
  FROM church_users
  WHERE church_id = $1
`;

exports.CREATE_CHURCH_USERS = `
  INSERT INTO church_users (
    user_id,
    church_id,
    created_date,
    created_by,
    updated_date,
    updated_by
  ) VALUES (
    $1,
    $2,
    now(),
    $3,
    null,
    null
  ) RETURNING *
`;

exports.DELETE_CHURCH_USERS_BY_ID = `DELETE FROM church_users WHERE church_user_id = $1;`;
exports.DELETE_CHURCH_USERS_BY_USER_ID = `DELETE FROM church_users WHERE user_id = $1;`;
exports.DELETE_CHURCH_USERS_BY_CHURCH_ID = `DELETE FROM church_users WHERE church_id = $1;`;
exports.DELETE_CHURCH_USERS_BY_USER_ID_AND_CHURCH_ID = `DELETE FROM church_users WHERE user_id = $1 AND church_id = $2;`;
