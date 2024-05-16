import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Logging untuk memeriksa nilai email dan password
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      return res.status(400).json({ msg: "Email dan password wajib diisi" });
    }

    const user = await Users.findOne({
      where: { email },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await argon2.verify(user.password, password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const role = user.role;
    // Kirim tanggapan JSON
    // res.status(200).json({ uuid, name, email, role });

    // Arahkan pengguna ke halaman dashboard setelah memberi tanggapan JSON
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }

  try {
    const user = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Me Error:", error); // Logging error
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err); // Logging error
      return res.status(400).json({ msg: "Tidak dapat logout" });
    }
    res.redirect("/");

    // res.status(200).json({ msg: "Anda telah logout" });
  });
};
