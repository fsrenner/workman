const db = require('../db');
const logger = require('../logger');
const {
  GET_CHURCH_USER,
  GET_CHURCH_USERS_BY_ID,
  GET_CHURCH_USERS_BY_USER_ID,
  GET_CHURCH_USERS_BY_CHURCH_ID,
  CREATE_CHURCH_USERS,
  DELETE_CHURCH_USERS_BY_ID,
  DELETE_CHURCH_USERS_BY_USER_ID,
  DELETE_CHURCH_USERS_BY_CHURCH_ID,
  DELETE_CHURCH_USERS_BY_USER_ID_AND_CHURCH_ID,
} = require('../queries/church_users');
const { getWhereClauseParameters } = require('../util');
const { churchUsersTableFields } = require('../util/constants');

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
    churchId,
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
    filtering.push(`${churchUsersTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (userId) {
    params.push(Number(userId));
    filtering.push(`${churchUsersTableFields.userId} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (churchId) {
    params.push(Number(churchId));
    filtering.push(`${churchUsersTableFields.churchId} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdDate) {
    params.push(createdDate);
    filtering.push(
      `${churchUsersTableFields.createdDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(
      `${churchUsersTableFields.createdBy} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(
      `${churchUsersTableFields.updatedDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(
      `${churchUsersTableFields.updatedBy} = $${fieldIncrementer}`
    );
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
    const tableFieldValue = churchUsersTableFields[orderParam];

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

const getChurchUsers = async (req, res) => {
  const filteredQuery = filterQuery(req.query, GET_CHURCH_USER);
  const results = await db.query(filteredQuery.sql, filteredQuery.params);
  return res.json({ churchUsers: results.rows });
};

const getChurchUsersById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_CHURCH_USERS_BY_ID, [id]);
  return res.json({ churchUsers: results.rows[0] });
};

const getChurchUsersByUserId = async (req, res) => {
  const { userId } = req.params;
  const results = await db.query(GET_CHURCH_USERS_BY_USER_ID, [userId]);
  return res.json({ churchUsers: results.rows });
};

const getChurchUsersByChurchId = async (req, res) => {
  const { churchId } = req.params;
  const results = await db.query(GET_CHURCH_USERS_BY_CHURCH_ID, [churchId]);
  return res.json({ churchUsers: results.rows });
};

const createChurchUser = async (req, res) => {
  const { userId, churchId } = req.body;
  const sessionId = req.session.userId;

  if (!userId) {
    return res.status(400).json({
      message: `The user id is required`,
    });
  }
  if (!churchId) {
    return res.status(400).json({
      message: `The church id is required`,
    });
  }

  const sqlParams = [userId, churchId, sessionId];
  const results = await db.query(CREATE_CHURCH_USERS, sqlParams);
  return res.json({ churchUsers: results.rows });
};

const deleteChurchUsersById = async (req, res) => {
  const { id } = req.params;
  await db.query(DELETE_CHURCH_USERS_BY_ID, [id]);
  const message = `Church User: ${id} was successfully deleted from church users`;
  logger.info(message);
  return res.json({
    churchUsers: message,
  });
};

const deleteChurchUsersByUserId = async (req, res) => {
  const { userId } = req.params;
  await db.query(DELETE_CHURCH_USERS_BY_USER_ID, [userId]);
  const message = `User: ${userId} was successfully deleted from church users`;
  logger.info(message);
  return res.json({
    churchUsers: message,
  });
};
const deleteChurchUsersByChurchId = async (req, res) => {
  const { churchId } = req.params;
  await db.query(DELETE_CHURCH_USERS_BY_CHURCH_ID, [churchId]);
  const message = `Church: ${churchId} was successfully deleted from church users`;
  logger.info(message);
  return res.json({
    churchUsers: message,
  });
};

const deleteChurchUsersByUserIdAndChurchId = async (req, res) => {
  const { userId, churchId } = req.params;
  await db.query(DELETE_CHURCH_USERS_BY_USER_ID_AND_CHURCH_ID, [
    userId,
    churchId,
  ]);
  const message = `User: ${userId} with Church: ${churchId} was successfully deleted from church users`;
  logger.info(message);
  return res.json({
    churchUsers: message,
  });
};

module.exports = {
  getChurchUsers,
  getChurchUsersById,
  getChurchUsersByChurchId,
  getChurchUsersByUserId,
  createChurchUser,
  deleteChurchUsersById,
  deleteChurchUsersByChurchId,
  deleteChurchUsersByUserId,
  deleteChurchUsersByUserIdAndChurchId,
};
