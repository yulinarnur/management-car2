import Users from "../models/UserModel.js";

// export const verifyUser = async (req, res, next) => {
//   if (!req.session.userId) {
//     return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
//   }
//   const user = await Users.findOne({
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   req.user = user;
//   next();
// };

// export const adminOnly = async (req, res, next) => {
//   const user = await Users.findOne({
//     where: {
//       uuid: req.session.userId,
//     },
//   });
//   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
//   if (user.role !== "admin")
//     return res.status(403).json({ msg: "Akses Terlarang " });
//   next();
// };

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await Users.findOne({
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.user = user;
  next();
};

export const adminOnly = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Akses Terlarang" });
  }
  next();
};
