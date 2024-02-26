import { Router } from "express";
import { User } from "../database/model/user";
import {
  validateUserEdit,
  validateUserLogin,
  validateUserRegistration,
} from "../middleware/validation";
import { IEditUser, ILogin, IUser } from "../@types/user";
import { createUser, validateUser } from "../service/user-service";
import { auth } from "../service/auth-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is-user";
import { Logger } from "../logs/logger";
import { appError } from "../error/app-error";

const router = Router();

//GET all users
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      res.json("No users yet");
    }
    return res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

//PUT edit user
router.put("/:id", isUser, validateUserEdit, async (req, res, next) => {
  try {
    const savedUser = (await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).lean()) as IEditUser;
    Logger.debug(savedUser);

    if (!savedUser) {
      throw new appError("User not found", 404);
    }
    res.json(savedUser);
  } catch (e) {
    next(e);
  }
});

//GET user by id
router.get("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = (await User.findById(id).lean()) as IUser;
    const { password, ...rest } = user;
    return res.json({ user: rest });
  } catch (e) {
    next(e);
  }
});

//POST register as new user
router.post("/", validateUserRegistration, async (req, res, next) => {
  try {
    const saved = await createUser(req.body as IUser);
    const { password, ...savedUser } = req.body;
    res.status(201).json({ message: "Saved", user: savedUser });
  } catch (err) {
    next(err);
  }
});

//POST login registed user
router.post("/login", validateUserLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body as ILogin;
    const jwt = await validateUser(email, password);
    res.json(jwt);
  } catch (e) {
    next(e);
  }
});

//DELETE user
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findOneAndDelete({ _id: id });
    return res.json(deleteUser);
  } catch (e) {
    next(e);
  }
});

//PATCH update bizz by user
router.patch("/:id", isUser, async (req, res, next) => {
  try {
    const isBusiness = !req.user.isBusiness;
    const saved = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { isBusiness: isBusiness } },
      {
        new: true,
      }
    );
    res.json({ saved });
  } catch (e) {
    next(e);
  }
});

export { router as usersRouter };
