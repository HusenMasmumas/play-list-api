import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DB_TABLE_NAME } from "../common/enum/database.enum";
import { ExtendedEntity } from "../common/extended-entity";
import { SongPlaylistEntity } from "./song-playlist.entity";

@Entity(DB_TABLE_NAME.PLAYLIST)
export class PlaylistEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  name: string;
}
