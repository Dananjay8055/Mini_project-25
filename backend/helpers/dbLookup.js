// helpers/dbLookup.js
import { Permission } from '../models/PermissionModels.js';
import { Role } from '../models/UserModels.js';

export async function getPermissionIds(code) {
  const permissions = await Permission.findOne({ code: code });
  return permissions
}

export async function getRoleId(code) {
  const role = await Role.findOne({ roleID:code });
  return role;
}
