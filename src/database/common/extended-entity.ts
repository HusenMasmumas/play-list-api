import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ENUMTypeColumnEntity } from "./enum/database.enum";

export class ExtendedEntity extends BaseEntity {
  public id?: number | string;

  @CreateDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: "created_at",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: ENUMTypeColumnEntity.TYPE_TIMESTAMP_TZ,
    name: "updated_at",
  })
  public updatedAt: Date;
}
