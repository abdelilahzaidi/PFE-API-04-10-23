import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramEntity } from 'src/commun/entities/program/program';
import { ProgramCreateDTO } from 'src/commun/dto/program/program-create.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}
  @Get()
  async all(): Promise<ProgramEntity[]> {
    return await this.programService.all();
  }
  @Post()
  async create(@Body() dto : ProgramCreateDTO):Promise<ProgramEntity>{
    return await this.programService.createProgram(dto);
  }
  @Get(':id')
  async getById(@Param('id') id: number){
      return this.programService.findProgramById(id);
  }

  @Put(':id')    
  async update(
      @Param('id') id: number,
      @Body() body
  ) {
      const { ...data} = body;
      
      await this.programService.update(id, {
          ...data,
         
      });

      return this.programService.findProgramById(id);
  }
}
