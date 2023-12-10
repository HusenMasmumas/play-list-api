import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../../server";
import { SongEntity } from "../../database/entities/song.entity";

const createData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(SongEntity)
      .values([
        {
          title: "Little Talks",
          time: "4:27",
          album: "My Head is An Animal",
          artist: "Of Monsters and Men",
        },
        {
          title: "Everybody Talks",
          time: "2:57",
          album: "Picture Show (Deluxe Edition)",
          artist: "Neon Trees",
        },
      ])

      .execute();

    res.status(201).json({
      code: 201,
      message: "สร้างข้อมูลสำเร็จ",
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: "สร้างข้อมูลไม่สำเร็จ",
    });
  }
};

export default {
  createData,
};
