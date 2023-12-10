import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    savedIngredients: {
      type: Array,
      default:[]
    },
    reviews: {
      type: Array,
      default:[]
    },
    savedRecipes: {
      type: Array,
      default:[]
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users",userSchema);
export default UserModel;