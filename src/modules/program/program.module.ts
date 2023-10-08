import { Module, forwardRef } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramEntity } from 'src/commun/entities/program/program';
import { UserEntity } from 'src/commun/entities/user/user';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([ProgramEntity,UserEntity]),forwardRef(() => UserModule)],
  providers: [ProgramService],
  controllers: [ProgramController],
  exports:[ProgramService]
})
export class ProgramModule {}
