import { User,Role } from "../models/UserModels";
import { DesignationPermission,RolePermission,Designation } from "../models/PermissionModels";



export const getUserPermissions = async (userId) => {
    try {
        // Find the user by ID
        const user = await User.findById(userId).populate('roleID designationID');
        if (!user) {
            throw new Error('User not found');
        }

        // Get the user's role and designation
        const role = user.roleID;
        const designation = user.designationID;

        // Fetch permissions based on role and designation
        const rolePermissions = await RolePermission.find({ roleID: role._id }).populate('permissionID');
        const designationPermissions = await DesignationPermission.find({ designationID: designation._id }).populate('permissionID');

        // Combine permissions from both sources
        const permissions = [...rolePermissions, ...designationPermissions];

        return permissions.map(permission => permission.permissionID.code);
    } catch (error) {
        console.error('Error fetching user permissions:', error);
        throw error;
    }
}