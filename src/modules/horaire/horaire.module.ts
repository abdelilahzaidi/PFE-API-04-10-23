import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { HoraireService } from './horaire.service';
import { HoraireController } from './horaire.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([HoraireEntity]),
        
      ],
      providers: [HoraireService],
      controllers: [HoraireController],

      exports:[HoraireService]

})
export class HoraireModule {}
