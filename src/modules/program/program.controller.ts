import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramEntity } from 'src/commun/entities/program/program';
import { ProgramCreateDTO } from 'src/commun/dto/program/program-create.dto';
import { UserStatus } from 'src/commun/enums/status.enum';
import { Status } from 'src/shared/security/status.decorator';
import { StatusGuard } from 'src/shared/security/status.guard';

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
  @UseGuards(StatusGuard)
  @Status(UserStatus.ADMIN)
  @Delete(':id')   
  async delete(@Param('id') id: number) {
      return this.programService.delete(id);
  }
}
