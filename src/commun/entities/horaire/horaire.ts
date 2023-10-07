import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { SeanceEntity } from '../seance/seance';

@Entity('horaire')
export class HoraireEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type : 'time'})
  heureDebut: Date;
  @Column({type : 'time'})
  heureFin: Date;
  @Column()
  jour: string;
  @OneToMany(() => SeanceEntity, (seance) => seance.horaire)
  seances: SeanceEntity[];
}
