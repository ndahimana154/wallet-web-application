import { hashPassword } from "../../helpers/authHelpers.js";
import User from "../models/users.js";

const seedUsers = async () => {
    const users = [
        {
            firstName: "Ndahimana",
            lastName: "Bonheur",
            username: "nd154",
            email: "ndahimana154@gmail.com",
            phone: "0788923011",
            password: await hashPassword("password123"),
        },
    ];
    await User.deleteMany();
    await User.insertMany(users);
};

export default seedUsers;