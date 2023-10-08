import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHoraireDto } from 'src/commun/dto/horaire/create-horaire.dto';
import { HoraireEntity } from 'src/commun/entities/horaire/horaire';
import { Repository } from 'typeorm';

@Injectable()
export class HoraireService {

  constructor(
    @InjectRepository(HoraireEntity)
    private readonly horaireRepository: Repository<HoraireEntity>,
  ) { }

  async all(): Promise<HoraireEntity[]> {
    return await this.horaireRepository.find();
  }

  async createHoraire(dto: CreateHoraireDto): Promise<HoraireEntity> {
    try {
      // Vérifiez d'abord s'il existe déjà un horaire avec la même heure pour le même jour
      const existingHoraire = await this.horaireRepository.findOne({
        where: {
          heureDebut: new Date(dto.heureDebut),
          jour: dto.jour,
        },
      });

      if (existingHoraire) {
        throw new ConflictException('Un horaire avec la même heure existe déjà pour ce jour.');
      }

      // Si aucun horaire existant n'a été trouvé, créez un nouvel horaire
      const horaire = new HoraireEntity();
      horaire.heureDebut = new Date(dto.heureDebut);
      horaire.heureFin = new Date(dto.heureFin);
      horaire.jour = dto.jour;

      const savedHoraire = await this.horaireRepository.save(horaire);

      console.log('in service', savedHoraire);
      return savedHoraire;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        "Une erreur est survenue lors de la creation de l'horaire.",
      );
    }
  }
  async findHoraireById(id: number): Promise<HoraireEntity | undefined> {
    return this.horaireRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<any> {
    return this.horaireRepository.delete(id);
  }

}




