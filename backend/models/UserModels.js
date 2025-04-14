import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g. 'student', 'mentor', 'admin'
});
const Role = mongoose.model("Role", roleSchema);

// Define the User schema & model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  gender: String,
  dob: Date,
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
  isActive: { type: Boolean, default: true },
});
const User = mongoose.model("User", userSchema);
// Define the Designation schema & model
const designationSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., 'Mentor', 'HOD', 'Dean'
  roleID: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true }, // Inherits permissions from Role
});
const Designation = mongoose.model("Designation", designationSchema);
// Define the Mentor schema & model
const mentorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  designationID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designation",
    required: true,
  },
  deptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  clgID: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
});
const Mentor = mongoose.model("Mentor", mentorSchema);

// Define the Student schema & model
const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  address: String,
  section: { type: mongoose.Schema.Types.ObjectId, ref: "Section" },
  semester: Number,
  deptID: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  clgID: { type: mongoose.Schema.Types.ObjectId, ref: "College" },
  mentorID: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
});
const Student = mongoose.model("Student", studentSchema);


export {Role, User, Designation, Mentor, Student};