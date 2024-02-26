import { Router } from "express";
import { Item } from "../database/model/item";
import { validateNewItem, validateNewMessage } from "../middleware/validation";
import { IItem, IItemInput } from "../@types/item";
import { markItemAsSold, newItem } from "../service/items-service";
import { isBusiness } from "../middleware/is-business";
import { isSeller } from "../middleware/is-seller";
import { appError } from "../error/app-error";
import { validateToken } from "../middleware/validate-token";
import { isLiked } from "../middleware/is-liked";
import { isSellerOrAdmin } from "../middleware/is-seller-or-admin";
import { Message } from "../database/model/massages";
import { IMessage } from "../@types/message";
import { isAdmin } from "../middleware/is-admin";

const router = Router();

//GET all messages
router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allMessages = await Message.find();
    if (!allMessages) {
      res.json("No Messages");
    }
    return res.json(allMessages);
  } catch (e) {
    next(e);
  }
});

//POST new message
router.post("/", validateNewMessage, async (req, res, next) => {
  try {
    const message = new Message(req.body as IMessage);
    message.save();
    res.status(201).json({ message: "Message saved", saved: message });
  } catch (e) {
    next(e);
  }
});

//DELETE message
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteMessage = await Message.findOneAndDelete({ _id: id });
    return res.json({ message: "message deleted", deleteMessage });
  } catch (e) {
    next(e);
  }
});

export { router as contactRouter };
