const db = require('../db');
const logger = require('../logger');
const { churchesTableFields } = require('../util/constants');
const { getWhereClauseParameters } = require('../util');
const {
  GET_CHURCHES,
  GET_CHURCHES_BY_ID,
  CREATE_CHURCH,
  DELETE_CHURCH_BY_ID,
} = require('../queries/churches');
const { convertDateMetaFields } = require('../util');

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
    name,
    denomination,
    description,
    email,
    website,
    phone,
    address,
    city,
    state,
    zip,
    createdBy,
    createdDate,
    updatedDate,
    updatedBy,
    sort,
    limit,
    offset,
  } = query;
  if (id) {
    params.push(Number(id));
    filtering.push(`${churchesTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (name) {
    params.push(name);
    filtering.push(
      `${churchesTableFields.name} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (denomination) {
    params.push(denomination);
    filtering.push(
      `${churchesTableFields.denomination} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }

  if (description) {
    params.push(description);
    filtering.push(
      `${churchesTableFields.description} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (email) {
    params.push(email);
    filtering.push(
      `${churchesTableFields.email} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (website) {
    params.push(website);
    filtering.push(
      `${churchesTableFields.website} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (phone) {
    params.push(phone);
    filtering.push(
      `${churchesTableFields.phone} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (address) {
    params.push(address);
    filtering.push(
      `${churchesTableFields.address} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (city) {
    params.push(city);
    filtering.push(
      `${churchesTableFields.city} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (state) {
    params.push(state);
    filtering.push(
      `${churchesTableFields.state} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }
  if (zip) {
    params.push(zip);
    filtering.push(
      `${churchesTableFields.zip} LIKE '%' || $${fieldIncrementer} || '%'`
    );
    fieldIncrementer++;
  }

  if (createdDate) {
    params.push(createdDate);
    filtering.push(`${churchesTableFields.createdDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(`${churchesTableFields.createdBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(`${churchesTableFields.updatedDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(`${churchesTableFields.updatedBy} = $${fieldIncrementer}`);
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
    const tableFieldValue = churchesTableFields[orderParam];

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

const getChurches = async (req, res) => {
  const filteredQuery = filterQuery(req.query, GET_CHURCHES);
  const results = await db.query(filteredQuery.sql, filteredQuery.params);
  const churches = convertDateMetaFields(results.rows);
  return res.json({ churches });
};

const getChurchById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_CHURCHES_BY_ID, [id]);
  const churches = convertDateMetaFields(results.rows);
  return res.json({ churches: churches[0] });
};

const createChurch = async (req, res) => {
  const { userId } = req.session;
  const {
    name,
    denomination,
    description,
    email,
    website,
    phone,
    address,
    city,
    state,
    zip,
  } = req.body;
  if (!name) {
    return res.status(400).json({
      message: `The name of the church is required`,
    });
  }
  const sqlParams = [
    name,
    denomination,
    description,
    email,
    website,
    phone,
    address,
    city,
    state,
    zip,
    userId,
  ];
  const results = await db.query(CREATE_CHURCH, sqlParams);
  const churches = convertDateMetaFields(results.rows);
  const church = churches[0];
  logger.info(`Created church: ${JSON.stringify(church)}`);
  return res.json({ churches: church });
};

const updateChurch = async (req, res) => {
  let fieldIncrementer = 1;
  const updateFields = [];
  const updateParams = [];
  const { id } = req.params;
  const { userId } = req.session;
  const {
    name,
    denomination,
    description,
    email,
    website,
    phone,
    address,
    city,
    state,
    zip,
  } = req.body;
  if (name) {
    updateFields.push(name);
    updateParams.push(`church_name = $${fieldIncrementer}`);
    fieldIncrementer++;
  }

  if (denomination) {
    updateFields.push(denomination);
    updateParams.push(`denomination = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (description) {
    updateFields.push(description);
    updateParams.push(`description = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (email) {
    updateFields.push(email);
    updateParams.push(`email = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (website) {
    updateFields.push(website);
    updateParams.push(`email = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (phone) {
    updateFields.push(phone);
    updateParams.push(`phone_number = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (address) {
    updateFields.push(address);
    updateParams.push(`address = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (city) {
    updateFields.push(city);
    updateParams.push(`city = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (state) {
    updateFields.push(state);
    updateParams.push(`state = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (zip) {
    updateFields.push(zip);
    updateParams.push(`zip = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  updateParams.push(
    `updated_date = CAST (EXTRACT (epoch from current_timestamp) AS BIGINT)`
  );
  updateFields.push(userId);
  updateParams.push(`updated_by = $${fieldIncrementer}`);
  fieldIncrementer++;
  updateFields.push(Number(id));
  const statement = `
    UPDATE churches
    SET ${updateParams.toString()}
    WHERE church_id = $${fieldIncrementer}
    RETURNING *;
  `;
  const results = await db.query(statement, updateFields);
  const churches = convertDateMetaFields(results.rows);
  logger.info(`Successfully updated church: ${JSON.stringify(churches[0])}`);
  return res.json({ churches: churches[0] });
};

const deleteChurch = async (req, res) => {
  const { id } = req.params;
  await db.query(DELETE_CHURCH_BY_ID, [id]);
  const message = `Church: ${id} was successfully deleted`;
  logger.info(message);
  return res.json({
    churches: message,
  });
};

module.exports = {
  getChurches,
  getChurchById,
  createChurch,
  updateChurch,
  deleteChurch,
};
