const logger = require('../logger');
const businessesService = require('../service').businesses;

const getBusinesses = async (req, res) => {
  try {
    return await businessesService.getBusinesses(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the businesses. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const getBusinessById = async (req, res) => {
  try {
    return await businessesService.getBusinessById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the business by Id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const createBusiness = async (req, res) => {
  try {
    return await businessesService.createBusiness(req, res);
  } catch (e) {
    logger.error(
      `There was a problem creating the business. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const updateBusiness = async (req, res) => {
  try {
    return await businessesService.updateBusiness(req, res);
  } catch (e) {
    logger.error(
      `There was a problem updating the business. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    return await businessesService.deleteBusiness(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the business. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

module.exports = {
  getBusinesses,
  getBusinessById,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
