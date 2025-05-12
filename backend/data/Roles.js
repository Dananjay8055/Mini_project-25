export const roles = {
  100: { name: "Admin", Permission: [0] },
  200: {
    name: "Teacher",
    Permission: [1002, 2002, 7001, 7002,7003],
  },
  300: {
    name: "Student",
    Permission: [1002, 2002, 7002],
  },
};
