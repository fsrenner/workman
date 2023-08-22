exports.GET_USER_ROLES = 'SELECT * FROM users_roles';

exports.GET_USERS_ROLES_BY_ID = `
  SELECT *
  FROM users_roles
  WHERE user_role_id = $1
`;

exports.GET_USER_ROLES_BY_USER_ID = `
  SELECT *
  FROM users_roles
  WHERE user_id = $1
`;

exports.CREATE_USERS_ROLES = `
  INSERT INTO users_roles (
    user_id,
    role_id,
    created_date,
    created_by,
    updated_date,
    updated_by
  ) VALUES (
    $1,
    $2,
    CAST (EXTRACT (epoch from current_timestamp) AS BIGINT),
    $3,
    null,
    null
  ) RETURNING *
`;

exports.DELETE_USERS_ROLES_BY_ID = `DELETE FROM users_roles WHERE user_role_id = $1;`;
exports.DELETE_USERS_ROLES_BY_USER_ID = `DELETE FROM users_roles WHERE user_id = $1;`;
exports.DELETE_USERS_ROLES_BY_USER_ID_AND_ROLE_ID = `DELETE FROM users_roles WHERE user_id = $1 AND role_id = $2;`;
