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

    // Sắp xếp
    const sort = {};
    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    // End Sắp xếp

    const tasks = await Task
        .find(find)
        .sort(sort);

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

function sort(sort: any) {
    throw new Error("Function not implemented.");
}
