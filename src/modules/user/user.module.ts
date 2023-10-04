import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/commun/entities/user/user';
import { LevelModule } from '../level/level.module';
import { MessageEntity } from 'src/commun/entities/message/message';
import { SeanceEntity } from 'src/commun/entities/seance/seance';
import { SeanceModule } from '../seance/seance.module';
import { SeanceUserEntity } from 'src/commun/entities/seance_user/seance-user';



@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity, MessageEntity,SeanceEntity,SeanceUserEntity]),   
    forwardRef(() => LevelModule),  
    forwardRef(() => SeanceModule)
    
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
