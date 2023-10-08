import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LieuService } from './lieu.service';
import { LieuEntity } from 'src/commun/entities/lieu/lieu';
import { CreateLieuDto } from 'src/commun/dto/lieu/lieu-create.dto';
import { UserStatus } from 'src/commun/enums/status.enum';
import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';

@Controller('lieu')
export class LieuController {
    constructor(
        private readonly lieuService : LieuService
    ){}

    @Get()
    async all():Promise<LieuEntity[]>{
        return await this.lieuService.all()
    }
    @Post()
    async create(@Body() dto : CreateLieuDto): Promise<LieuEntity> {
      console.log(dto)
      return await this.lieuService.createLieu(dto);
    }

    @Get(':id')
    async getLieuById(@Param('id') id: number){
        return this.lieuService.findLieuById(id)
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Delete(':id')   
    async delete(@Param('id') id: number) {
        return this.lieuService.delete(id);
    }

    @UseGuards(StatusGuard)
    @Status(UserStatus.ADMIN)
    @Put(':id')    
    async update(
        @Param('id') id: number,
        @Body() body
    ) {
        const { ...data} = body;
        
        await this.lieuService.update(id, {
            ...data,
           
        });
  
        return this.lieuService.findLieuById(id);
    }
    
}
