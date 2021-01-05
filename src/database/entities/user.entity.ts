import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany, UpdateDateColumn, CreateDateColumn, BeforeUpdate } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from 'class-transformer';
import { genSalt, hash, compare } from 'bcrypt';
import { PostEntity } from "./post.entity";

@Entity({name: 'users'})
export class UserEntity {

  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public password: string;

  @ApiProperty()
  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public email: string;

  @ApiProperty()
  @Column({
    length: 60,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  public username: string;

  @ApiProperty()
  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  public fullname: string;

  @ApiProperty()
  @OneToMany(type => PostEntity, post => post.user)
  public posts: PostEntity[];

  @ApiProperty()
  @CreateDateColumn()
  public createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  public updatedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  private async encriptPassword() {
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
  }

  public async comparePassword(password: string) : Promise<boolean> {
    return await compare(password, this.password);
  }

}