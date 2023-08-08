const db = require('../db');
const logger = require('../logger');
const { churchesTableFields } = require('../util/constants');
const { getWhereClauseParameters } = require('../util');
const { GET_CHURCHES, GET_CHURCHES_BY_ID } = require('../queries/churches');

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
    phone,
    address,
    city,
    state,
    zip,
    country,
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
    params.push(Number(name));
    filtering.push(`${churchesTableFields.name} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (denomination) {
    params.push(Number(denomination));
    filtering.push(
      `${churchesTableFields.denomination} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }

  if (description) {
    params.push(Number(description));
    filtering.push(`${churchesTableFields.description} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (email) {
    params.push(Number(email));
    filtering.push(`${churchesTableFields.email} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (phone) {
    params.push(Number(phone));
    filtering.push(`${churchesTableFields.phone} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (address) {
    params.push(Number(address));
    filtering.push(`${churchesTableFields.address} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (city) {
    params.push(Number(city));
    filtering.push(`${churchesTableFields.city} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (state) {
    params.push(Number(state));
    filtering.push(`${churchesTableFields.state} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (zip) {
    params.push(Number(zip));
    filtering.push(`${churchesTableFields.zip} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (country) {
    params.push(Number(country));
    filtering.push(`${churchesTableFields.country} = $${fieldIncrementer}`);
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
  return res.json({ churches: results.rows });
};

const getChurchById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_CHURCHES_BY_ID, [id]);
  return res.json({ churches: results.rows });
};

module.exports = {
  getChurches,
  getChurchById,
};
