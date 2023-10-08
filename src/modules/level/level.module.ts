import { Module, forwardRef } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from 'src/commun/entities/level/level';
import { ProgramModule } from '../program/program.module';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([LevelEntity]),
    forwardRef(()=>ProgramModule),
    forwardRef(()=>UserModule),
    forwardRef(()=>AuthModule),
  
  ],
  providers: [LevelService],
  controllers: [LevelController],
  exports:[LevelService]
})
export class LevelModule {}
