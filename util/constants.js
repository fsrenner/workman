exports.alphaNumSpaceDash = /^[a-zA-Z0-9 -]+$/;
exports.phone = /^\d{10}$/;
exports.zip = /^\d{10}$/;
exports.dob =
  /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

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

exports.churchesTableFields = {
  id: 'church_id',
  name: 'church_name',
  denomination: 'denomination',
  description: 'description',
  email: 'email',
  phone: 'phone_number',
  address: 'address',
  city: 'city',
  state: 'state',
  zip: 'zip',
  createdDate: 'created_date',
  createdBy: 'created_by',
  updatedDate: 'updated_date',
  updatedBy: 'updated_by',
};

exports.churchUsersTableFields = {
  id: 'church_user_id',
  userId: 'user_id',
  churchId: 'church_id',
  createdDate: 'created_date',
  createdBy: 'created_by',
  updatedDate: 'updated_date',
  updatedBy: 'updated_by',
};

exports.businessesTableFields = {
  id: 'business_id',
  name: 'business_name',
  description: 'description',
  email: 'email',
  phone: 'phone_number',
  address: 'address',
  city: 'city',
  state: 'state',
  zip: 'zip',
  createdDate: 'created_date',
  createdBy: 'created_by',
  updatedDate: 'updated_date',
  updatedBy: 'updated_by',
};
