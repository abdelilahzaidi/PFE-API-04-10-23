import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelEntity } from 'src/commun/entities/level/level';
import { CreateLevelDto } from 'src/commun/dto/level/level-create.dto';
import { UserStatus } from 'src/commun/enums/status.enum';
import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';

@Controller('level')
export class LevelController {
    constructor(
        private readonly levelService: LevelService,
        
      ) {}
      @Get()
      async all():Promise<LevelEntity[]>{
        return await this.levelService.all()
        
      }
    
      @Post()
      async create(@Body() dto : CreateLevelDto): Promise<LevelEntity> {
        console.log(dto)
        return await this.levelService.createLevel(dto);
      }
      @UseGuards(StatusGuard)
      @Status(UserStatus.ADMIN)
      @Delete(':id')   
      async delete(@Param('id') id: number) {
          return this.levelService.delete(id);
      }
}
