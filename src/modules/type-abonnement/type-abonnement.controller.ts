import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateTypeAbonnementDTO } from 'src/commun/dto/type-abonnement/type-abonnement-create.dto';
import { TypeAbonnementEntity } from 'src/commun/entities/typeAbonnement/typeAbonnemnt';
import { TypeAbonnementService } from './type-abonnement.service';

@Controller('type-abonnement')
export class TypeAbonnementController {
    constructor(private readonly typeAbonnementService: TypeAbonnementService) {}

  @Get()
  findAll(): Promise<TypeAbonnementEntity[]> {
    return this.typeAbonnementService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<TypeAbonnementEntity | undefined> {
    return this.typeAbonnementService.findById(id);
  }

  @Post()
  create(@Body() createTypeAbonnementDTO: CreateTypeAbonnementDTO): Promise<TypeAbonnementEntity> {
    

    return this.typeAbonnementService.create(createTypeAbonnementDTO);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTypeAbonnementDTO: CreateTypeAbonnementDTO): Promise<TypeAbonnementEntity | undefined> {
    const typeAbonnement = new TypeAbonnementEntity();
    typeAbonnement.type = updateTypeAbonnementDTO.type;
    typeAbonnement.tarif = updateTypeAbonnementDTO.tarif;

    return this.typeAbonnementService.update(id, typeAbonnement);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.typeAbonnementService.delete(id);
  }

}
