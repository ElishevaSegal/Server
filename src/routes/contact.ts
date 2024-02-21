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
    //const userId = req.user?._id;
    // if (!userId) {
    //   throw new appError("User must have id", 500);
    // }

    const message = new Message(req.body as IMessage);
    message.save();
    // const saved = await newItem(req.body as IItem, userId);
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

//GET item by id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const item = (await Item.findById(id)) as IItemInput;
//     if (!item) {
//       throw new appError("Item not found", 404);
//     }
//     res.json(item);
//   } catch (e) {
//     next(e);
//   }
// });

//PUT edit item
// router.put("/:id", async (req, res, next) => {
//   try {
//     const savedItem = await Item.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (savedItem.status === "sold") {
//       const updatedStatus = await markItemAsSold(savedItem._id);
//       console.log(updatedStatus);
//     }

//     res.json({ message: "Item updeted", savedItem });
//   } catch (e) {
//     next(e);
//   }
// });

//PATCH liked item
// router.patch("/:id", validateToken, isLiked, async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const saved = await Item.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { likes: userId } },
//       {
//         new: true,
//       }
//     );
//     if (!saved) {
//       throw new appError("Item not found", 404);
//     }
//     res.json({ saved });
//   } catch (e) {
//     next(e);
//   }
// });
// router.patch("/status/:id", async (req, res, next) => {
//   try {
//     const status = !req.item.status;
//     const saved = await Item.findOneAndUpdate(
//       { _id: req.params.id },
//       { $set: { status: status } },
//       {
//         new: true,
//       }
//     );
//     res.json({ saved });
//   } catch (e) {
//     next(e);
//   }
// });

export { router as contactRouter };
