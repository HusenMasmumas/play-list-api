import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../../server";
import { SongEntity } from "../../database/entities/song.entity";
import { ILike } from "typeorm";

const getSong = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query as any;

    const songEntities = await AppDataSource.getRepository(
      SongEntity
    ).findAndCount({
      skip: (Number(query.page || null) - 1) * Number(query.limit || null),
      take: Number(query.limit || null),
      order: {
        id: query.orderby,
      },
      where: {
        title: query.search ? ILike(`%${query.search}%`) : null,
      },
    });
    res.status(200).json({
      code: res.locals?.code || 200,
      message: res.locals?.message || "",
      status: res.locals?.status || "success",
      result: [
        {
          data: songEntities?.[0],
          total: songEntities?.[1],
          count: Number(query.limit),
          page: Number(query?.page || 1),
          pageCount:
            Math.ceil(Number(songEntities?.[1]) / Number(query.limit)) || 1,
        },
      ],
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: "ไม่พบข้อมูล",
    });
  }
};

export default {
  getSong,
};
