const logger = require('../logger');
const churchUsersService = require('../service').usersRoles;

const getChurchUsers = async (req, res) => {
  try {
    return await churchUsersService.getChurchUsers(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the church users. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const getChurchUsersById = async (req, res) => {
  try {
    return await churchUsersService.getChurchUsersById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the church users by id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const getChurchUsersByUserId = async (req, res) => {
  try {
    return await churchUsersService.getChurchUsersByUserId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the church users by the user id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const getChurchUsersByChurchId = async (req, res) => {
  try {
    return await churchUsersService.getChurchUsersByChurchId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the church users by the church id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const createChurchUsers = async (req, res) => {
  try {
    return await churchUsersService.createChurchUsers(req, res);
  } catch (e) {
    logger.error(
      `There was a problem creating the church users. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteChurchUsersById = async (req, res) => {
  try {
    return await churchUsersService.deleteChurchUsersById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the church users by id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteChurchUsersByUserId = async (req, res) => {
  try {
    return await churchUsersService.deleteChurchUsersByUserId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the church users by user id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteChurchUsersByChurchId = async (req, res) => {
  try {
    return await churchUsersService.deleteChurchUsersByChurchId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the church users by church id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

module.exports = {
  getChurchUsers,
  getChurchUsersById,
  getChurchUsersByUserId,
  getChurchUsersByChurchId,
  createChurchUsers,
  deleteChurchUsersById,
  deleteChurchUsersByUserId,
  deleteChurchUsersByChurchId,
};
