import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    required: false,
    type: String,

    maxlength: 5000,
    default:
      "https://i.pinimg.com/564x/cb/c1/c1/cbc1c1aeef9092676adcd3c13a167860.jpg",
  },
  alt: {
    required: false,
    type: String,

    maxlength: 200,
  },
});
export { imageSchema };
