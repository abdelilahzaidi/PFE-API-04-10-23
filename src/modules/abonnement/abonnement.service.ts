import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAbonnementDTO } from 'src/commun/dto/abonnment/abonnement-create.dto';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';
import { Repository } from 'typeorm';
import { TypeAbonnementService } from '../type-abonnement/type-abonnement.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AbonnementService {
  constructor(
    @InjectRepository(AbonnementEntity)
    private readonly abonnementRepository: Repository<AbonnementEntity>,
    private readonly typeAbonnementService: TypeAbonnementService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<AbonnementEntity[]> {
    return this.abonnementRepository.find();
  }

  async findById(id: number): Promise<AbonnementEntity | undefined> {
    return this.abonnementRepository.findOne({ where: { id } });
  }

  async create(dto: CreateAbonnementDTO): Promise<AbonnementEntity> {
    try {     
      const typeAbonnement = await this.typeAbonnementService.findById(
        dto.typeAbonnementId,
      );
      if (!typeAbonnement) {
        throw new NotFoundException("Type d'abonnement introuvable.");
      }

      const user = await this.userService.findOneById(dto.userId);
      if (!user) {
        throw new NotFoundException('Utilisateur introuvable.');
      }

      const abonnement = new AbonnementEntity();

      abonnement.dateDebut = new Date(dto.dateDebut);
      abonnement.dateFin = new Date(dto.dateFin);
      abonnement.typeAbonnement = typeAbonnement;
      abonnement.user = user;
      const savedAbonnement = await this.abonnementRepository.save(abonnement);

      return savedAbonnement;
    } catch (error) {
      throw new InternalServerErrorException(
        error,
        "Une erreur est survenue lors de la création de l'abonnement.",
      );
    }
  }

  async update(
    id: number,
    abonnement: AbonnementEntity,
  ): Promise<AbonnementEntity | undefined> {
    await this.abonnementRepository.update(id, abonnement);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.abonnementRepository.delete(id);
  }
}
