import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const exsistingUser = await User.findOne({ email });

    if (!exsistingUser)
      return res
        .status(404)
        .json(`Bu => ${email} email bilan foydalanuvchi yo'q :)`);

    bcrypt.compare(password, exsistingUser.password, function (err, result) {
      console.log(password, exsistingUser.password, result);
      if (!result)
        return res.status(400).json({ message: "Berilganlar xato!?" });
    });

    const token = jwt.sign(
      { email: exsistingUser.email, id: exsistingUser._id },
      "test",
      { expiresIn: 60 * 60 }
    );

    console.log(`token ${token}`);

    res.status(200).json({ result: exsistingUser, token });
  } catch (e) {
    res.status(500).json("Nimadir xato ishlamoqda?");

    console.log(e);
  }
};

export const signup = async (req, res) => {
  const {
    form: { email, password, confirmPassword, firstName, lastName },
  } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (oldUser)
      return res
        .status(400)
        .json({ message: `Bu => ${email} alaqachon kiritilgan!` });

    if (password !== confirmPassword)
      return res.status(400).json("Passwordlar mos tushmadi :)");

    bcrypt.hash(password, 10, async (err, hash) => {
      const result = await User.create({
        email: email,
        password: hash,
        name: `${firstName} ${lastName}`,
      });

      const token = jwt.sign({ email: result.email, id: result._id }, "test", {
        expiresIn: 60 * 60,
      });

      res.status(201).json({ result, token });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
