const logger = require('../logger');
const churchesService = require('../service').churches;

const getChurches = async (req, res) => {
  try {
    return await churchesService.getChurches(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the churches. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const getChurchById = async (req, res) => {
  try {
    return await churchesService.getChurchById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the church by Id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const createChurch = async (req, res) => {
  try {
    return await churchesService.createChurch(req, res);
  } catch (e) {
    logger.error(
      `There was a problem creating the church. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const updateChurch = async (req, res) => {
  try {
    return await churchesService.updateChurch(req, res);
  } catch (e) {
    logger.error(
      `There was a problem updating the church. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const deleteChurch = async (req, res) => {
  try {
    return await churchesService.deleteChurch(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the church. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

module.exports = {
  getChurches,
  getChurchById,
  createChurch,
  updateChurch,
  deleteChurch,
};
