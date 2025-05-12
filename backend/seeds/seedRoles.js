import { roles } from "../data/Roles.js";
import { Role } from "../models/UserModels.js";
import { RolePermission } from "../models/PermissionModels.js";
import { getPermissionIds } from "../helpers/dbLookup.js";
export const seedRoles = async () => {
    try {
        // Check if roles already exist in the database
        const existingRoles = await Role.find();
        // if (existingRoles.length > 0) {
        // console.log("Roles already seeded.");
        // return;
        // }
    
        // Seed roles
        for (const [roleID, { name , Permission }] of Object.entries(roles)) {
        const role = new Role({ roleID, name });
        await role.save();
        for (const permissionID of Permission) {
            const permission = await getPermissionIds(permissionID)
            const rolePermission = new RolePermission({ roleID: role._id, permissionID: permission });
            console.log(rolePermission);
            await rolePermission.save();
        }
        console.log("Roles seeded successfully.");
    }} catch (err) {
        console.error("Error seeding roles:", err.message);
    }
};