import { DateCourService } from './../date-cour/date-cour.service';
import { ConflictException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeanceCreateDTO } from 'src/commun/dto/seance/seance-create.dto';
import { SeanceEntity } from 'src/commun/entities/seance/seance';
import { Repository, ServerCapabilities } from 'typeorm';
import { CourService } from '../cour/cour.service';
import { HoraireService } from '../horaire/horaire.service';
import {MoreThan} from 'typeorm';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';


@Injectable()
export class SeanceService {
  private readonly logger = new Logger(SeanceService.name);

    constructor(
        @InjectRepository(SeanceEntity) private readonly seanceRepository :Repository<SeanceEntity>,
        private readonly dateCourService : DateCourService,
        private readonly courService : CourService,
        private readonly horaireService : HoraireService,
        
        ){}

    async getAllSeances(): Promise<SeanceEntity[]> {
        return this.seanceRepository.find({ relations:["horaire","cour","dateCour"]});
    }


    async getAllFuturSeances(): Promise<SeanceEntity[]> {
      return await this.seanceRepository.createQueryBuilder('s').leftJoinAndSelect('s.dateCour','dc').where('dc.dateCour > :today',{today:new Date()}).getMany();
  }

    async createSeance(dto: SeanceCreateDTO): Promise<SeanceEntity | null>  {
        try {
          this.logger.debug(`${JSON.stringify(dto)}`)
          const dateCour = await this.dateCourService.findDateCourById(dto.idDateCour)
          if (dateCour) {
            throw new ConflictException('Cette date de Cour existe déjà.');
          }

          const cour = await this.courService.findCourById(dto.idCour)

           const horaire = await this.horaireService.findHoraireById(dto.idHoraire)
          if (!horaire) {
            throw new ConflictException('Cet horaire existe déjà.');
          }          
    
          const seance = new SeanceEntity();
          seance.cour = cour;
          seance.horaire=horaire;
          seance.dateCour=dateCour
    
          const savedSeance = await this.seanceRepository.save(seance);
    
          console.log('in service', savedSeance);
          return savedSeance;
        } catch (error) {
          throw new InternalServerErrorException(
            error,
            'Une erreur est survenue lors de la création de la seance.',
          );
        }
      }



   
    


    async findOneById(id: number): Promise<SeanceEntity> {
        return this.seanceRepository.findOne({where:{id}, relations:["horaire"]});
    }

}
