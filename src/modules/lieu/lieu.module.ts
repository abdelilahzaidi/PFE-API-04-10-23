import { Module, forwardRef } from '@nestjs/common';
import { LieuService } from './lieu.service';
import { LieuController } from './lieu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LieuEntity } from 'src/commun/entities/lieu/lieu';
import { UserEntity } from 'src/commun/entities/user/user';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([LieuEntity]),  
    forwardRef(()=>UserModule),
    forwardRef(()=>AuthModule),
],
  providers: [LieuService],
  controllers: [LieuController],
  exports:[LieuService]
})
export class LieuModule {}
