const db = require('../db');
const logger = require('../logger');
const { businessTableFields } = require('../util/constants');
const {
  GET_BUSINESSES,
  GET_BUSINESSES_BY_ID,
  CREATE_BUSINESS,
  DELETE_BUSINESS_BY_ID,
} = require('../queries/businesses');
const { getWhereClauseParameters } = require('../util');

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
    filtering.push(`${businessTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (name) {
    params.push(Number(name));
    filtering.push(`${businessTableFields.name} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (denomination) {
    params.push(Number(denomination));
    filtering.push(
      `${businessTableFields.denomination} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }

  if (description) {
    params.push(Number(description));
    filtering.push(`${businessTableFields.description} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (email) {
    params.push(Number(email));
    filtering.push(`${businessTableFields.email} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (phone) {
    params.push(Number(phone));
    filtering.push(`${businessTableFields.phone} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (address) {
    params.push(Number(address));
    filtering.push(`${businessTableFields.address} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (city) {
    params.push(Number(city));
    filtering.push(`${businessTableFields.city} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (state) {
    params.push(Number(state));
    filtering.push(`${businessTableFields.state} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (zip) {
    params.push(Number(zip));
    filtering.push(`${businessTableFields.zip} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }

  if (createdDate) {
    params.push(createdDate);
    filtering.push(`${businessTableFields.createdDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(`${businessTableFields.createdBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(`${businessTableFields.updatedDate} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(`${businessTableFields.updatedBy} = $${fieldIncrementer}`);
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
    const tableFieldValue = businessTableFields[orderParam];

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

const getBusinesses = async (req, res) => {
  const filteredQuery = filterQuery(req.query, GET_BUSINESSES);
  const results = await db.query(filteredQuery.sql, filteredQuery.params);
  return res.json({ churches: results.rows });
};

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_BUSINESSES_BY_ID, [id]);
  return res.json({ churches: results.rows[0] });
};

const createBusiness = async (req, res) => {
  const { userId } = req.session;
  const { name, description, email, phone, address, city, state, zip } =
    req.body;
  if (!name) {
    return res.status(400).json({
      message: `The name of the business is required`,
    });
  }
  const sqlParams = [
    name,
    description,
    email,
    phone,
    address,
    city,
    state,
    zip,
    userId,
  ];
  const { rows } = await db.query(CREATE_BUSINESS, sqlParams);
  const business = rows[0];
  logger.info(`Created business: ${JSON.stringify(business)}`);
  return res.json({ business });
};

const updateBusiness = async (req, res) => {
  let fieldIncrementer = 1;
  const updateFields = [];
  const updateParams = [];
  const { id } = req.params;
  const { userId } = req.session;
  const { name, description, email, phone, address, city, state, zip } =
    req.body;
  if (name) {
    updateFields.push(name);
    updateParams.push(`church_name = $${fieldIncrementer}`);
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
  updateParams.push(`updated_date = now()`);
  updateFields.push(userId);
  updateParams.push(`updated_by = $${fieldIncrementer}`);
  fieldIncrementer++;
  updateFields.push(Number(id));
  const statement = `
    UPDATE businesses
    SET ${updateParams.toString()}
    WHERE business_id = $${fieldIncrementer}
    RETURNING *;
  `;
  const { rows } = await db.query(statement, updateFields);
  logger.info(`Successfully updated business: ${JSON.stringify(rows[0])}`);
  return res.json({ churches: rows[0] });
};

const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  await db.query(DELETE_BUSINESS_BY_ID, [id]);
  const message = `Businesses: ${id} was successfully deleted`;
  logger.info(message);
  return res.json({
    churches: message,
  });
};

module.exports = {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
