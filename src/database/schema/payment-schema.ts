import { Schema } from "mongoose";

const paymentSchema = new Schema({
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
        const [month, year] = value.split("/").map(Number);
        const currentYear = new Date().getFullYear();

        if (isNaN(month) || isNaN(year)) {
          return false;
        }
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
});
export { paymentSchema };
