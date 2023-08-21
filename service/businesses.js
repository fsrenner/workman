const db = require('../db');
const logger = require('../logger');
const { businessesTableFields } = require('../util/constants');
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
    filtering.push(`${businessesTableFields.id} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (name) {
    params.push(name);
    filtering.push(`${businessesTableFields.name} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }

  if (description) {
    params.push(description);
    filtering.push(
      `${businessesTableFields.description} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (email) {
    params.push(email);
    filtering.push(`${businessesTableFields.email} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (phone) {
    params.push(Number(phone));
    filtering.push(`${businessesTableFields.phone} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (address) {
    params.push(address);
    filtering.push(`${businessesTableFields.address} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (city) {
    params.push(city);
    filtering.push(`${businessesTableFields.city} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (state) {
    params.push(state);
    filtering.push(`${businessesTableFields.state} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (zip) {
    params.push(Number(zip));
    filtering.push(`${businessesTableFields.zip} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }

  if (createdDate) {
    params.push(createdDate);
    filtering.push(
      `${businessesTableFields.createdDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (createdBy) {
    params.push(Number(createdBy));
    filtering.push(`${businessesTableFields.createdBy} = $${fieldIncrementer}`);
    fieldIncrementer++;
  }
  if (updatedDate) {
    params.push(updatedDate);
    filtering.push(
      `${businessesTableFields.updatedDate} = $${fieldIncrementer}`
    );
    fieldIncrementer++;
  }
  if (updatedBy) {
    params.push(Number(updatedBy));
    filtering.push(`${businessesTableFields.updatedBy} = $${fieldIncrementer}`);
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
    const tableFieldValue = businessesTableFields[orderParam];

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
  return res.json({ businesses: results.rows });
};

const getBusinessById = async (req, res) => {
  const { id } = req.params;
  const results = await db.query(GET_BUSINESSES_BY_ID, [id]);
  return res.json({ businesses: results.rows[0] });
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
    updateParams.push(`business_name = $${fieldIncrementer}`);
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
  return res.json({ businesses: rows[0] });
};

const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  await db.query(DELETE_BUSINESS_BY_ID, [id]);
  const message = `Business: ${id} was successfully deleted`;
  logger.info(message);
  return res.json({
    businesses: message,
  });
};

module.exports = {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
