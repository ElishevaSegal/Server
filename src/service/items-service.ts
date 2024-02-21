import { Item } from "../database/model/item";
import { IItemInput } from "../@types/item";
import { ObjectId } from "mongoose";
const newItem = async (data: IItemInput, userId: string) => {
  const item = new Item(data);

  item.userId = userId;
  //random number that does not exist in the database:
  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Item.findOne({ itemNumber: random });
    if (!dbRes) {
      item.itemNumber = random;
      break;
    }
  }
  item.image.url =
    item.image?.url || "https://cdn-icons-png.flaticon.com/256/147/147142.png";
  item.image.alt = item.image?.alt || "default alt";
  return item.save();
};
const markItemAsSold = async (itemId: string) => {
  try {
    // Assuming you have your Mongoose model as `Item`
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $set: {
          // status: "sold",
          saleDate: new Date(), // Set saleDate to the current date and time
        },
      },
      { new: true }
    );

    if (!item) {
      console.error("Item not found");
      return;
    }

    console.log(`Item "${item.title}" marked as sold.`);
  } catch (error) {
    console.error("Error marking item as sold:", error);
  }
};

export { newItem, markItemAsSold };
