import { CourModule } from './../cour/cour.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceEntity } from 'src/commun/entities/seance/seance';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';
import { CourEntity } from 'src/commun/entities/cour/cour';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { DateCourEntity } from 'src/commun/entities/dateCour/dateCour';
import { DateCourModule } from '../date-cour/date-cour.module';
import { HoraireModule } from '../horaire/horaire.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([SeanceEntity,CourEntity,HoraireEntity,DateCourEntity]),
        forwardRef(()=>CourModule),
        forwardRef(()=>HoraireModule),
        forwardRef(()=>DateCourModule),
      ],
      providers: [SeanceService],
      controllers: [SeanceController],
      exports:[SeanceService]
})
export class SeanceModule {}
