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
    item.image?.url ||
    "https://i.pinimg.com/564x/cb/c1/c1/cbc1c1aeef9092676adcd3c13a167860.jpg";
  item.image.alt = item.image?.alt || "item";
  return item.save();
};
const markItemAsSold = async (itemId: string) => {
  try {
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        $set: {
          saleDate: new Date(),
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
