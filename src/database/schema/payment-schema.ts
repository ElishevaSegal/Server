import { Schema } from "mongoose";
import { IPayment } from "../../@types/item";

const paymentSchema = new Schema<IPayment>({
  cardNumber: {
    required: true,
    type: Number,
    minlength: 12,
    maxlength: 19,
  },
  expirationDate: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        // Assuming the expirationDate is in the format 'MM/YYYY'
        const [month, year] = value.split("/").map(Number);
        const currentYear = new Date().getFullYear();

        if (isNaN(month) || isNaN(year)) {
          return false; // Invalid format
        }

        // Check if the expiration year is not sooner than the current year
        return year >= currentYear;
      },
      message: "Expiration year must not be sooner than the current year",
    },
  },
  cvv: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
  },
  id: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 9,
  },
  //   expitationMonth: {
  //     required: true,
  //     type: Number,
  //     enum:[1,2,3,4,5,6,7,8,9,10,11,12],
  //     minlength: 1,
  //     maxlength: 2,

  //   },
  //   expitationYear: {
  //     required: true,
  //     type: Number,
  //     minlength: ,
  //     maxlength: 20,
  //   },
});
export { paymentSchema };
