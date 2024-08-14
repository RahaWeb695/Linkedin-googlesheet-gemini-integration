import User from "../model/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, id, accesstoken } = req.body;
    // console.log(username, email, id, accesstoken);

    const user = await User.create({
      username,
      email,
      id,
      accesstoken,
    });

    res.status(200).json({ message: "user created successfully", user });
  } catch (err) {
    res.status(500).json(err);
  }
};
