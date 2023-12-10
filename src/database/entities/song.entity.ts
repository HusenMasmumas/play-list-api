import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DB_TABLE_NAME } from "../common/enum/database.enum";
import { ExtendedEntity } from "../common/extended-entity";

@Entity(DB_TABLE_NAME.SONG)
export class SongEntity extends ExtendedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true, length: 55 })
  title: string;

  @Column({ type: "varchar", length: 55 })
  artist: string;

  @Column({ type: "varchar", length: 55 })
  album: string;

  @Column({ type: "time" })
  time: string;
}
