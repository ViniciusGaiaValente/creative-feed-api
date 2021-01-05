import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { UserEntity } from "./user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'posts'})
export class PostEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty()
  @Column({
    length: 80,
    type: 'varchar',
    nullable: false,
  })
  public title: string;

  @ApiProperty()
  @Column({
    length: 600,
    type: 'varchar',
    nullable: false,
  })
  public description: string;

  @ApiProperty()
  @Column({
    length: 120,
    type: 'varchar',
    nullable: true,
  })
  public preview?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: true,
  })
  public banner?: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public body: string;

  @ApiProperty()
  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  public private: boolean;

  @Exclude()
  @Column({
    type: "simple-array",
    default: [],
  })
  public images: string[];

  @ApiProperty()
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  public updatedAt: Date

  @ApiProperty()
  @ManyToOne(type => UserEntity, user => user.posts, { onDelete: 'CASCADE' })
  public user: UserEntity;

}