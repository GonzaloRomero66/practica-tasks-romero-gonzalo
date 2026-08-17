import { TaskModel } from "./src/models/Task.js";
import { UserModel } from "./src/models/User.js";
import { ProfeModel } from "./src/models/Profesores.js";
import { MateriaModel } from "./src/models/Materias.js";
UserModel.hasMany(TaskModel, {
    foreignKey: "UserId"
});

TaskModel.belongsTo(UserModel, {
    foreignKey: "UserId"
});

UserModel.hasOne(ProfeModel, {
    foreignKey: "UserId"
});

ProfeModel.belongsTo(UserModel, {
    foreignKey: "UserId"
});

ProfeModel.hasMany(MateriaModel, {
    foreignKey: "ProfeId"
});

MateriaModel.belongsTo(ProfeModel, {
    foreignKey: "ProfeId"
});

MateriaModel.hasMany(TaskModel, {
    foreignKey: "MateriaId"
});

TaskModel.belongsTo(MateriaModel, {
    foreignKey: "MateriaId"
});