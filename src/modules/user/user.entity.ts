import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  password: string;
}
