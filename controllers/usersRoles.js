const logger = require('../logger');
const usersRolesService = require('../service').usersRoles;

const getUsersRoles = async (req, res) => {
  try {
    return await usersRolesService.getUsersRoles(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the users roles. Error: ${JSON.stringify(e)}`
    );
    return res.status(500).json({ e });
  }
};

const getUsersRolesById = async (req, res) => {
  try {
    return await usersRolesService.getUsersRolesById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the users roles by id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const getUsersRolesByUserId = async (req, res) => {
  try {
    return await usersRolesService.getUsersRolesByUserId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem getting the users roles by the user id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const createUsersRoles = async (req, res) => {
  try {
    return await usersRolesService.createUsersRoles(req, res);
  } catch (e) {
    logger.error(
      `There was a problem creating the users roles. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteUsersRolesById = async (req, res) => {
  try {
    return await usersRolesService.deleteUsersRolesById(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the users roles by id. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteUsersRolesByUserId = async (req, res) => {
  try {
    return await usersRolesService.deleteUsersRolesByUserId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the users roles for user. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
};

const deleteUsersRolesByUserIdAndRoleId = async (req, res) => {
  try {
    return await usersRolesService.deleteUsersRolesByUserIdAndRoleId(req, res);
  } catch (e) {
    logger.error(
      `There was a problem deleting the users roles for user and role. Error: ${JSON.stringify(
        e
      )}`
    );
    return res.status(500).json({ e });
  }
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
