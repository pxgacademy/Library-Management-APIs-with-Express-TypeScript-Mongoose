import { model, Schema } from "mongoose";
import { BookGenre, CreateBookInputs } from "../types/book.types";

const bookSchema = new Schema<CreateBookInputs>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: { type: String, required: [true, "Author is required"] },
    genre: {
      type: String,
      enum: {
        values: Object.values(BookGenre),
        message: "Enter a valid genre, {VALUE} is invalid",
      },
      required: [true, "Genre is required"],
      uppercase: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      // unique: [true, "{VALUE} is already exist, enter an unique ISBN"],
      unique: true,
    },
    description: { type: String, default: "" },
    copies: {
      type: Number,
      required: [true, "Number of copies is required"],
      min: [0, "Copies cannot be negative"],
    },
    available: { type: Boolean, required: [true, "Availability is required"] },
  },
  {
    timestamps: true,
  }
);

export const Book = model<CreateBookInputs>("Book", bookSchema);
