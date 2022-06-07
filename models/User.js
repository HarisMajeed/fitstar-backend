const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    fullName: { type: String, default: "" },
    password: { type: String },
    location: [
      {
        country: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
      },
    ],
    tokenStatus: { type: Boolean, default: false },
    lastLogin: { type: String },
    role: { type: String, enum: ["admin", "pro", "center", "model"] },
    isDeleted: { type: Boolean, default: true },
    status: { type: String, enum: ["active", "blocked"], default: "blocked" },
    referId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true, versionKey: false }
);

/**
 * Password hash middleware.
 */

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
