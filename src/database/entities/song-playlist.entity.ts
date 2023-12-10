import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  DB_TABLE_NAME,
  ENUMTypeColumnEntity,
} from "../common/enum/database.enum";

import { PlaylistEntity } from "./playlist.entity";
import { SongEntity } from "./song.entity";

@Entity(DB_TABLE_NAME.SONG_PLAYLIST)
export class SongPlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.id, {
    nullable: false,
  })
  @JoinColumn({ name: "playlist-id" })
  playlist: PlaylistEntity;

  @Column({ name: "playlist-id" })
  playlistId: number;

  @ManyToOne(() => SongEntity, (song) => song.id, { nullable: false })
  @JoinColumn({ name: "song-id" })
  song: SongEntity;

  @Column({ name: "song-id" })
  songId: number;

  @CreateDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: "created_at",
  })
  public createdAt: Date;
}
