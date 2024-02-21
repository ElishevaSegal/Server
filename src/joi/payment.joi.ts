// import Joi from "joi";
// import { IPayment } from "../@types/item";
// import { expirationDateRegex } from "./patterns";

// const payment = Joi.object<IPayment>({
//   cardNumber: Joi.number().min(1).max(999999).required(),
//   expirationDate: Joi.string()
//     .min(1)
//     .max(13)
//     .required()
//     .pattern(expirationDateRegex),
//   cvv: Joi.string().min(3).max(3).required(),
//   id: Joi.string().min(8).max(9).required(),
// });

// export { payment as paymentSchema };
