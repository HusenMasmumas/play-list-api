import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../../server";
import { PlaylistEntity } from "../../database/entities/playlist.entity";
import { ILike } from "typeorm";
import { SongPlaylistEntity } from "../../database/entities/song-playlist.entity";

const getPlaylist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query as any;

    const playlistEntities = await AppDataSource.getRepository(
      PlaylistEntity
    ).findAndCount({
      skip: (Number(query.page || null) - 1) * Number(query.limit || null),
      take: Number(query.limit || null),
      order: {
        id: query.orderby,
      },
      //   relations: ["playlist"],
      where: {
        name: query.search ? ILike(`%${query.search}%`) : null,
      },
    });
    res.status(200).json({
      code: res.locals?.code || 200,
      message: res.locals?.message || "",
      status: res.locals?.status || "success",
      result: [
        {
          data: playlistEntities?.[0],
          total: playlistEntities?.[1],
          count: Number(query.limit),
          page: Number(query?.page || 1),
          pageCount:
            Math.ceil(Number(playlistEntities?.[1]) / Number(query.limit)) || 1,
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

const postPlaylist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;

    const createPlaylist = new PlaylistEntity();
    createPlaylist.name = body?.name;

    const result = await AppDataSource.manager.save(createPlaylist);
    var table = [];

    for (const list of body?.table) {
      table = [
        ...table,
        {
          songId: list,
          playlistId: result?.id,
        },
      ];
    }
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(SongPlaylistEntity)
      .values(table)
      .execute();

    res.status(201).json({
      code: 201,
      message: "สร้างข้อมูลสำเร็จ",
      result: result,
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "สร้างข้อมูลไม่สำเร็จ",
    });
  }
};

export default {
  getPlaylist,
  postPlaylist,
};
