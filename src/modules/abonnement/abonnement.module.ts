import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';
import { AbonnementController } from './abonnement.controller';
import { AbonnementService } from './abonnement.service';
import { TypeAbonnementEntity } from 'src/commun/entities/typeAbonnement/typeAbonnemnt';
import { TypeAbonnementModule } from '../type-abonnement/type-abonnement.module';
import { UserModule } from '../user/user.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([AbonnementEntity,TypeAbonnementEntity]),
        forwardRef(()=>TypeAbonnementModule),
        forwardRef(()=>UserModule)
        
      ],
      providers: [AbonnementService],
      controllers: [AbonnementController],
      exports:[AbonnementService]
})
export class AbonnementModule {}
