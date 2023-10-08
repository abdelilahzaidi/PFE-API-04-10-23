import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';
import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDTO } from 'src/commun/dto/abonnment/abonnement-create.dto';

@Controller('abonnement')
export class AbonnementController {
    constructor(private readonly abonnementService: AbonnementService) {}

  @Get()
  findAll(): Promise<AbonnementEntity[]> {
    return this.abonnementService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<AbonnementEntity | undefined> {
    return this.abonnementService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAbonnementDTO): Promise<AbonnementEntity> {
    return this.abonnementService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() abonnement: AbonnementEntity): Promise<AbonnementEntity | undefined> {
    return this.abonnementService.update(id, abonnement);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.abonnementService.delete(id);
  }
}
