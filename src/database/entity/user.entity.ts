import { hash } from 'argon2';
import { Exclude } from 'class-transformer';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { GenderEnum } from '../enum/gender.enum';
import { DefaultEntity } from './default.entity';
import { Product } from './product.entity';

@Entity({ name: 'User' })
export class User extends DefaultEntity {
  @OneToMany(() => Product, (product) => product.user)
  product: Product[];

  @Column({ type: 'varchar', length: 32 })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 12 })
  username: string;

  @Column({ type: 'enum', enum: GenderEnum })
  gender: GenderEnum;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password);
  }
}
