const logger = require('../logger');
const usersService = require('../service').users;

const getUsers = async (req, res) => {
  try {
    return await usersService.getUsers(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the users. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const getUserById = async (req, res) => {
  try {
    return await usersService.getUserById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const createUser = async (req, res) => {
  try {
    return await usersService.createUser(req, res);
  } catch (e) {
    logger.error(
      `There was a problem creating the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const verifyUser = async (req, res) => {
  try {
    return await usersService.verifyUser(req, res);
  } catch (e) {
    logger.error(
      `There was a problem verifying the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const updateUser = async (req, res) => {
  try {
    return await usersService.updateUser(req, res);
  } catch (e) {
    logger.error(
      `There was a problem updating the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const deleteUser = async (req, res) => {
  try {
    return await usersService.deleteUser(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the user. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  verifyUser,
  updateUser,
  deleteUser,
};
