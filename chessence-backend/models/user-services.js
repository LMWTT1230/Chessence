import mongoose from "mongoose";
import userModel from "./user.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose
    .connect(
        "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PWD +
            "@" +
            process.env.MONGO_CLUSTER +
            "/" +
            process.env.MONGO_DB +
            "?retryWrites=true&w=majority",
        {
            useNewUrlParser: true, //useFindAndModify: false,
            useUnifiedTopology: true,
        }
    )
    .catch((error) => console.log(error));

// async function findUserByUserName(username) {
//   return await userModel.find({ username: username });
// }

async function deleteUser(username) {
    return await userModel.findOneAndDelete({ username });
}

async function addUser(user) {
    try {
        const exist = await userModel.findOne({ username: user.username });

        if (exist) {
            return { success: false, message: "Username already exists" };
        }

        const hashedPwd = await bcrypt.hash(user.password, 10);

        const userToAdd = new userModel({
            firstName: user.firstname,
            lastName: user.lastname,
            username: user.username,
            password: hashedPwd,
            email: user.email,
        });

        const savedUser = await userToAdd.save();

        return savedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function login(email, password) {
    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            // User not found
            return { success: false, message: "User not found" };
        }

        // At this point, user is found. Now, check if the provided password matches the stored hash
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Passwords match
            return { success: true, message: "Login successful" };
        } else {
            // Passwords don't match
            return { success: false, message: "Incorrect password" };
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: "An error occurred" };
    }
}

async function updateProfile(user, oldPwd) {
    try {
        const exist = await userModel.findById(user._id);

        if (!exist) {
            return { success: false, message: "User not found" };
        }

        const pwdMatch = await bcrypt.compare(oldPwd, exist.password);

        if (pwdMatch) {
            const filter = { _id: user._id };
            const update = {};

            if (user.firstName) {
                update.firstName = user.firstName;
            }
            if (user.lastName) {
                update.lastName = user.lastName;
            }
            if (user.email) {
                update.email = user.email;
            }
            if (user.password) {
                const hashedPwd = await bcrypt.hash(user.password, 10);
                update.password = hashedPwd;
            }

            const updatedUser = null;
            if (Object.keys(update).length > 0) {
                updatedUser = await userModel.findOneAndUpdate(filter, update, {
                    new: true,
                });
                return updatedUser;
            }

            return updatedUser;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        return null;
    }
}

export default {
    addUser,
    deleteUser,
    login,
    updateProfile,
};
