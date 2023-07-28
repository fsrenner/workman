exports.GET_USER_ROLES = `
  SELECT 
    user_role_id,
    user_id,
    role_id,
    created_date,
    created_by,
    updated_date,
    updated_by
  FROM users_roles`;

exports.GET_USERS_ROLES_BY_ID = `${this.GET_USER_ROLES} WHERE user_role_id = $1`;
exports.GET_USERS_ROLES_BY_USER_ID = `${this.GET_USER_ROLES} WHERE user_id = $1`;

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
    now(),
    $3,
    null,
    null
  )
`;

exports.DELETE_USERS_ROLES = `DELETE FROM users WHERE user_id = $1;`;
