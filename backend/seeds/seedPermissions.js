import { Permissions } from "../data/permission.js";
import { Permission } from "../models/PermissionModels.js";
export const seedPermissions = async()=>{
    try {
        // Check if permissions already exist in the database
        const existingPermissions = await Permission.find();
        // if (existingPermissions.length > 0) {
        //     console.log("Permissions already seeded.");
        //     return;
        // }

        // Seed permissions
        for (const [code, { desc }] of Object.entries(Permissions)) {
            const permission = new Permission({ code, description: desc });
            await permission.save();
        }
        console.log("Permissions seeded successfully.");
    }
    catch(err){
        console.error("Error seeding permissions:", err.message);
    }
}