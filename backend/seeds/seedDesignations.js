import { designation } from "../data/Designation.js";
import { Designation } from "../models/PermissionModels.js";
import { DesignationPermission } from "../models/PermissionModels.js";
import { getPermissionIds,getRoleId } from "../helpers/dbLookup.js";


export const seedDesignations = async()=>{
    try {
        // Check if designations already exist in the database
        const existingDesignations = await Designation.find();
        // if (existingDesignations.length > 0) {
        //     console.log("Designations already seeded.");
        //     return;
        // }

        // Seed designations
        for (const [code, { name, permissions,role }] of Object.entries(designation)) {
            const roleId = await getRoleId(role);
            
            const designation =new Designation({
                degnId: code,  // Assuming degnId is a unique identifier
                name: name,
                roleID: roleId,  // Ensure this matches the field in your schema // Ensure your Designation schema has a 'permissions' field
            });
            await designation.save();
            for (const permissionID of permissions) {
                const permission = await getPermissionIds(permissionID)
                const desgnationPermission = new DesignationPermission({ designationID: designation, permissionID: permission });
                console.log(desgnationPermission);
                await desgnationPermission.save();
            }
        }
        console.log("Designations seeded successfully.");
    } catch (err) {
        console.error("Error seeding designations:", err.message);
    }
}