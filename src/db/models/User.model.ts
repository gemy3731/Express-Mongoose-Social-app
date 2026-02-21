import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcrypt";


export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}



export interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
  }
);


UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
  
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  });


UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};


UserSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email }).select("+password");
};

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;