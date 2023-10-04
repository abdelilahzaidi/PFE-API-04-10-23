import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateHoraireDto } from 'src/commun/dto/horaire/create-horaire.dto';
import { HoraireService } from './horaire.service';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';

@Controller('horaire')
export class HoraireController {
    constructor(
        private readonly horaireService : HoraireService
    ){}

    @Get()
    async all():Promise<HoraireEntity[]>{
        return await this.horaireService.all()
    }
    @Post()
    async create(@Body() dto : CreateHoraireDto): Promise<HoraireEntity> {
      console.log(dto)
      return await this.horaireService.createHoraire(dto);
    }

    @Get(':id')
    async getLieuById(@Param('id') id: number){
        return this.horaireService.findHoraireById(id)
    }
}
