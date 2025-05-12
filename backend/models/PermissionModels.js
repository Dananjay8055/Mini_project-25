import mongoose from "mongoose";

// Define the Permission schema & model
const permissionSchema = new mongoose.Schema({
  code: { type: Number, required: true }, // e.g. 'view_student', 'approve_leave'
  description: { type: String, required: true }, // Optional: Add 'required' if needed
});

// Check if the Permission model is already defined
const Permission = mongoose.models.Permission || mongoose.model("Permission", permissionSchema);

// Define RolePermission as a mapping between Role and Permission
const rolePermissionSchema = new mongoose.Schema({
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  permissionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
});
// Ensure uniqueness on the combination
rolePermissionSchema.index({ roleID: 1, permissionID: 1 }, { unique: true });
const RolePermission =
  mongoose.models.RolePermission ||
  mongoose.model("RolePermission", rolePermissionSchema);

// Define the Designation schema & model
const designationSchema = new mongoose.Schema({
  degnId : {type:Number, required:true ,unique:true},
  name: { type: String, required: true }, // e.g., 'Mentor', 'HOD', 'Dean'
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }, // Inherits permissions from Role
});

// Check if the Designation model is already defined
const Designation = mongoose.models.Designation || mongoose.model("Designation", designationSchema);

// Define DesignationPermission as a mapping between Designation and Permission
const designationPermissionSchema = new mongoose.Schema({
  designationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designation",
    required: true,
  },
  permissionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Permission",
    required: true,
  },
});
designationPermissionSchema.index({ designationID: 1, permissionID: 1 }, { unique: true });

const DesignationPermission =
  mongoose.models.DesignationPermission ||
  mongoose.model("DesignationPermission", designationPermissionSchema);

export { Permission, RolePermission, Designation, DesignationPermission };
