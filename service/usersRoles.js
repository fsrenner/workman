const db = require('../db');
const logger = require('../logger');
const {
  GET_USER_ROLES,
  GET_USERS_ROLES_BY_ID,
  GET_USER_ROLES_BY_USER_ID,
  DELETE_USERS_ROLES_BY_ID,
  DELETE_USERS_ROLES_BY_USER_ID,
  DELETE_USERS_ROLES_BY_USER_ID_AND_ROLE_ID,
} = require('../queries/users_roles');
const { getWhereClauseParameters, convertDateMetaFields } = require('../util');
const {
  usersRolesTableFields,
  usersRolesTableInsertValues,
} = require('../util/constants');

const filterQuery = (query, statement) => {
  const DESC = 'desc';
  const ASC = 'asc';
  const params = [];
  const filtering = [];
  let fieldIncrementer = 1;
  let limitFilter = '';
  let offsetFilter = '';
  let orderBy = '';
  const {
    id,
    userId,
    roleId,
    createdDate,
    createdBy,
    updatedDate,
    updatedBy,
    sort,
    limit,
    offset,
  } = query;
  if (id) {
    params.push(Number(id));
    filtering.push(`${usersRolesTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (userId) {
    params.push(Number(userId));
    filtering.push(`${usersRolesTableFields.userId} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (roleId) {
    params.push(Number(roleId));
    filtering.push(`${usersRolesTableFields.roleId} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdDate) {
    params.push(createdDate);
    filtering.push(
      `${usersRolesTableFields.createdDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(`${usersRolesTableFields.createdBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(
      `${usersRolesTableFields.updatedDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(`${usersRolesTableFields.updatedBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (sort) {
    const splitSort = sort.trim().split(' ');
    const orderParam = splitSort[0].trim();
    let direction = splitSort[1].trim().toLowerCase();
    if (!direction || direction === DESC) {
      direction = DESC;
    } else if (direction === ASC) {
      direction = ASC;
    } else {
      direction = DESC;
    }
    const tableFieldValue = usersRolesTableFields[orderParam];

    if (!tableFieldValue) {
      orderBy = '';
    } else {
      orderBy = `ORDER BY ${tableFieldValue} ${direction}`;
    }
  }
  if (limit) {
    params.push(Number(limit));
    limitFilter = `LIMIT $${fieldIncrementer}`;
    fieldIncrementer++;
  }
  if (offset) {
    params.push(offset);
    offsetFilter = `OFFSET $${fieldIncrementer}`;
    fieldIncrementer++;
  }
  const fullQuery = `
    ${statement}
    ${getWhereClauseParameters(filtering)}
    ${orderBy}
    ${limitFilter}
    ${offsetFilter}
  `;

  logger.debug(fullQuery);
  logger.debug(params);

  return {
    sql: fullQuery,
    params,
  };
};

const getUsersRoles = async (req, res) => {
  const filteredQuery = filterQuery(req.query, GET_USER_ROLES);
  const results = await db.query(filteredQuery.sql, filteredQuery.params);
  const usersRoles = convertDateMetaFields(results.rows);
  return res.json({ usersRoles });
};

const getUsersRolesById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_USERS_ROLES_BY_ID, [id]);
  const usersRoles = convertDateMetaFields(results.rows);
  return res.json({ usersRoles: usersRoles[0] });
};

const getUsersRolesByUserId = async (req, res) => {
  const { userId } = req.params;
  const results = await db.query(GET_USER_ROLES_BY_USER_ID, [userId]);
  const usersRoles = convertDateMetaFields(results.rows);
  return res.json({ usersRoles });
};

const createUsersRoles = async (req, res) => {
  const params = [];
  const { userId, roleId } = req.body;
  const sessionId = req.session.userId;

  roleId.forEach((role) => {
    params.push(userId);
    params.push(role);
    params.push(sessionId);
  });
  const statement = `
  INSERT INTO users_roles (
    user_id,
    role_id,
    created_date,
    created_by,
    updated_date,
    updated_by
  ) VALUES 
  ${usersRolesTableInsertValues.slice(0, roleId.length)}
  RETURNING *
`;
  const results = await db.query(statement, params);
  const usersRoles = convertDateMetaFields(results.rows);
  return res.json({ usersRoles });
};

const deleteUsersRolesById = async (req, res) => {
  const { id } = req.params;
  await db.query(DELETE_USERS_ROLES_BY_ID, [id]);
  const message = `Users Role: ${id} was successfully deleted from users roles`;
  logger.info(message);
  return res.json({
    usersRoles: message,
  });
};

const deleteUsersRolesByUserId = async (req, res) => {
  const { userId } = req.params;
  await db.query(DELETE_USERS_ROLES_BY_USER_ID, [userId]);
  const message = `User: ${userId} was successfully deleted from users roles`;
  logger.info(message);
  return res.json({
    usersRoles: message,
  });
};

const deleteUsersRolesByUserIdAndRoleId = async (req, res) => {
  const { userId, roleId } = req.params;
  await db.query(DELETE_USERS_ROLES_BY_USER_ID_AND_ROLE_ID, [userId, roleId]);
  const message = `User: ${userId} with Role: ${roleId} was successfully deleted from users roles`;
  logger.info(message);
  return res.json({
    usersRoles: message,
  });
};

module.exports = {
  getUsersRoles,
  getUsersRolesById,
  getUsersRolesByUserId,
  createUsersRoles,
  deleteUsersRolesById,
  deleteUsersRolesByUserId,
  deleteUsersRolesByUserIdAndRoleId,
};
