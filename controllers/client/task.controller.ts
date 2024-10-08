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

    // Tìm Kiếm
    if(req.query.keyword) {
        const regex = new RegExp(`${req.query.keyword}`, "i");
        find["title"] = regex;
    }
    // Hết Tìm Kiếm

    // Sắp xếp
    const sort = {};
    const sortKey = `${req.query.sortKey}`;
    const sortValue = req.query.sortValue;
    if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
    }
    // End Sắp xếp

    // Phân trang
    let limitItems: number = 2;
    if(req.query.limitItems) {
        limitItems = parseInt(`${req.query.limitItems}`);
    } 
    let page: number = 1;
    if(req.query.page) {
        page = parseInt(`${req.query.page}`);
    }
    const skip: number = (page - 1) * limitItems;
    // Hết phân trang


    const tasks = await Task
        .find(find)
        .limit(limitItems)
        .skip(skip)
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


// [PATCH] /tasks/change-status
export const changeStatus = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        const status: string = req.body.status;
        await Task.updateMany({
            _id: { $in: ids }
        }, {
            status: status
        })
        res.json({
            message: "Cập nhật dữ liệu thành công."
        });
    } catch (error) {
        res.json({
            message: "Not Found"
        })
    }
}


// [POST] /tasks/create
export const create = async (req: Request, res: Response) => {
    try {
        req.body.createBy = req["user"].id;

        const task = new Task(req.body);
        await task.save();
        res.json({
            message: "Thêm mới dữ liệu thành công.",
            task: task
        });
    } catch (error) {
        res.json({
            message: "Not Found"
        })
    }
}


// [PATCH] /tasks/edit/:id
export const edit = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await Task.updateOne({
            _id: id
        }, req.body);
        res.json({
            message: "Cập nhật dữ liệu thành công."
        });
    } catch (error) {
        res.json({
            message: "Not Found"
        })
    }
}


// [PATCH] /tasks/deleteItems
export const deleteItems = async (req: Request, res: Response) => {
    try {
        const ids: string[] = req.body.ids;
        await Task.updateOne({
            _id: {$in: ids}
        },{
            deleted: true
        });
        res.json({
            message: "Xóa công việc thành công."
        });
    } catch (error) {
        res.json({
            message: "Not Found"
        })
    }
}