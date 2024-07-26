import mongoose from "mongoose";
import City from "./City.js";
import User from "./User.js";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: City,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    features: {
      type: Object,
      default: {},
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    bargain: {
      type: Boolean,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    isModerated: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
