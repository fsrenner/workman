exports.alphaNumSpaceDash = /^[a-zA-Z0-9 -]+$/;

exports.userTableFields = {
  id: 'user_id',
  username: 'username',
  email: 'email',
  firstName: 'first_name',
  lastName: 'last_name',
  dob: 'date_of_birth',
  phone: 'phone_number',
  address: 'address',
  city: 'city',
  state: 'state',
  zip: 'zip',
  country: 'country',
  lastLogin: 'last_login',
  verified: 'verfied',
  createdDate: 'created_date',
  createdBy: 'created_by',
  updatedDate: 'updated_date',
  updatedBy: 'updated_by',
};

exports.usersRolesTableFields = {
  id: 'user_role_id',
  userId: 'user_id',
  roleId: 'role_id',
  createdDate: 'created_date',
  createdBy: 'created_by',
  updatedDate: 'updated_date',
  updatedBy: 'updated_by',
};

exports.usersRolesTableInsertValues = [
  '($1, $2, now(), $3, null, null)',
  '($4, $5, now(), $6, null, null)',
  '($7, $8, now(), $9, null, null)',
  '($10, $11, now(), $12, null, null)',
  '($13, $14, now(), $15, null, null)',
  '($16, $17, now(), $18, null, null)',
  '($19, $20, now(), $21, null, null)',
];
