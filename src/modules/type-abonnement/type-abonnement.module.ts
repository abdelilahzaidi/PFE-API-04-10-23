import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeAbonnementEntity } from 'src/commun/entities/typeAbonnement/typeAbonnemnt';
import { TypeAbonnementService } from './type-abonnement.service';
import { TypeAbonnementController } from './type-abonnement.controller';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';

@Module({
    imports:[
        TypeOrmModule.forFeature([TypeAbonnementEntity,AbonnementEntity]),
        
      ],
      providers: [TypeAbonnementService],
      controllers: [TypeAbonnementController],
      exports:[TypeAbonnementService]
})
export class TypeAbonnementModule {}
