import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { User } from './user.entity';

@Entity({ name: 'Product' })
export class Product extends DefaultEntity {
  @Column({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.product, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 64 })
  category: string;

  @Column({ type: 'varchar', nullable: true })
  image: string;
}
