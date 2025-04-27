import { User } from "../entities/user.entity";

export const transformUsersArray = (users: User[]) => {
    return {
        users: users
    };
};
