import { DataSource } from "typeorm";
import { SongEntity } from "./database/entities/song.entity";
import { PlaylistEntity } from "./database/entities/playlist.entity";
import { SongPlaylistEntity } from "./database/entities/song-playlist.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "play-list",
  synchronize: true,
  logging: false,
  entities: [SongEntity, PlaylistEntity, SongPlaylistEntity],
  subscribers: [],
  migrations: [],
});
