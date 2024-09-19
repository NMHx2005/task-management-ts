import express, { Express, Request, Response } from "express";
import Task from "../../models/task.model";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
    const find = {
        deleted: false
    };

    // Lọc theo trạng thái
    const status = req.query.status;
    if (status) {
        find["status"] = status;
    }
    // Hết Lọc theo trạng thái

    const tasks = await Task.find(find);

    res.json(tasks);
}

// [GET] /tasks/detail/:id
export const detail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const tasks = await Task.find({
        _id: id,
        deleted: false
    });

    res.json(tasks);
}