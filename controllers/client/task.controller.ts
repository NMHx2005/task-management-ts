import express, { Express, Request, Response } from "express";
import Task from "../../models/task.model";

// [GET] /tasks
export const index = async (req: Request, res: Response) => {
    const tasks = await Task.find({});

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