import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * @code writer 김현균
 * @description 자유게시판 Entity
 */
@Entity({
  name: 'FREEBOARD',
})
export class FreeBoardEntity extends BaseEntity {
  @ApiProperty({
    example: '1',
  })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: '제목입니다.',
    required: true,
  })
  @Column({ type: 'text', nullable: false, comment: '제목' })
  title: string;

  @ApiProperty({
    example: '본문입니다.',
    required: true,
  })
  @Column({ type: 'text', nullable: false, comment: '본문' })
  description: string;

  @ApiProperty({
    example: '2022-09-01T01:27:39.000Z',
  })
  @CreateDateColumn({ type: 'datetime', comment: '생성일' })
  createAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'datetime', comment: '삭제일' })
  deleteAt: Date;

  // UserEntity 생성 후 연결
  // @ManyToOne(() => UserEntity, (user: UserEntity) => user.freeBoards, {
  //   onDelete: 'NO ACTION',
  // })
  // @JoinColumn({
  //   name: 'user_id',
  //   referencedColumnName: 'id',
  // })
  // user: UserEntity;
}
