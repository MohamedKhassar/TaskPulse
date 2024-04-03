import { User } from "@/types/SchemasTypes";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<User>(
  {
    image: {
      type: String,
      default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatars&psig=AOvVaw2bD-Ki9WIHsyLUrnXLgmGP&ust=1712061821134000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMiUqreFoYUDFQAAAAAdAAAAABAE"
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
