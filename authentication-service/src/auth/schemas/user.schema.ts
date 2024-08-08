import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('user')
export class UserSchema{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: "varchar" , length : 100})
  password: string;

  @Column({ type: "varchar" , length : 100})
  tid: string;

  @Column({ type: "varchar" , length : 100})
  oid: string;

  @Column({ type: "varchar" , length : 100})
  aud: string;

  @Column({ type: "varchar" , length : 100})
  azp: string;

  @Column('simple-array')
  name: string[];
}
