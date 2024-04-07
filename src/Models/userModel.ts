import { User } from "@/types/SchemasTypes";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>(
  {
    image: {
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png"
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
