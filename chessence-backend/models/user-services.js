import mongoose from "mongoose";
import userModel from "./user.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

// uncomment the following line to view mongoose debug messages
mongoose.set("debug", true);

mongoose.connect(process.env.MONGODB_URI);
//.catch((error) => console.log(error));

// async function findUserByUserName(username) {
//   return await userModel.find({ username: username });
// }

async function deleteUser(username) {
    return await userModel.findOneAndDelete({ username });
}

async function existUsername(user) {
    const exist = await userModel.findOne({ username: user.username });
    if (exist) {
        return true;
    }
    return false;
}

async function existEmail(user) {
    const exist = await userModel.findOne({ email: user.email });
    if (exist) {
        return true;
    }
    return false;
}

async function addUser(user) {
    // try {
    const exist = await userModel.findOne({ username: user.username });

    if (exist) {
        return false;
    }

    const hashedPwd = await bcrypt.hash(user.password, 10);

    const userToAdd = new userModel({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: hashedPwd,
        email: user.email,
    });

    const savedUser = await userToAdd.save();

    return savedUser;
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
}

async function login(email, password) {
    // try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
        // User not found
        return false;
    }

    // At this point, user is found. Now, check if the provided password matches the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        // Passwords match
        console.log("password match");
        const userId = user._id;
        return userId.toString();
    } else {
        // Passwords don't match
        return false;
    }
    // } catch (error) {
    //     console.log(error);
    //     return false;
    // }
}

async function findID(email) {
    const user = await userModel.findOne({ email: email });

    if (!user) {
        return false;
    }
    return user._id;
}

async function updateProfile(id, user, oldPwd) {
    //try {
    const exist = await userModel.findById(id);

    if (!exist) {
        return false;
    }

    const pwdMatch = await bcrypt.compare(oldPwd, exist.password);

    if (pwdMatch) {
        const filter = { _id: id };
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
        if (user.username) {
            update.username = user.username;
        }
        if (user.password) {
            const hashedPwd = await bcrypt.hash(user.password, 10);
            update.password = hashedPwd;
        }

        let updatedUser = null;
        if (Object.keys(update).length > 0) {
            updatedUser = await userModel.findOneAndUpdate(filter, update, {
                new: true,
            });
            return updatedUser;
        }

        return updatedUser;
    } else {
        return false;
    }
    // } catch (error) {
    //     console.error("Error updating user profile:", error);
    //     return false;
    // }
}

async function getUsernameById(userId) {
    //try {
    const user = await userModel.findById(userId);

    if (!user) {
        return null;
    }

    return user.username;
    // } catch (error) {
    //     console.error("Error fetching username by ID:", error);
    //     throw error;
    // }
}

export default {
    addUser,
    deleteUser,
    login,
    updateProfile,
    findID,
    getUsernameById,
    existUsername,
    existEmail,
};
