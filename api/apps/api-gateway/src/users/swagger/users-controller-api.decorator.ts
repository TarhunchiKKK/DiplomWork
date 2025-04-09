import { createControllerApiInfo } from "common/swagger";
import { UsersController } from "../users.controller";

export const UsersControllerApi = createControllerApiInfo<UsersController>({
    tags: "Пользователи",

    methods: {}
});
