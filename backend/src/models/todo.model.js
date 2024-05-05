import { model, Schema } from "mongoose";

export const ToDoSchema = new Schema({
	task: { type: String, required: true },
	done: { type: Boolean, required: true },
});

export const ToDoModel = model("todo", ToDoSchema);
