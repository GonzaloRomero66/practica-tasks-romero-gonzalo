import { TaskModel } from "./src/models/Task.js";
import { UserModel } from "./src/models/User.js";

UserModel.hasMany(TaskModel, {
    foreignKey: "UserId"
})
TaskModel.belongsTo(UserModel, {
    foreignKey: "UserId"
})