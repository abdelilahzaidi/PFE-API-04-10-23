import { AbonnementService } from './../abonnement/abonnement.service';
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTypeAbonnementDTO } from 'src/commun/dto/type-abonnement/type-abonnement-create.dto';
import { LevelEntity } from 'src/commun/entities/level/level';
import { TypeAbonnementEntity } from 'src/commun/entities/typeAbonnement/typeAbonnemnt';
import { Repository } from 'typeorm';
import { AbonnementEntity } from 'src/commun/entities/abonnement/abonnement';

@Injectable()
export class TypeAbonnementService {
    constructor(
        @InjectRepository(TypeAbonnementEntity)
        private readonly typeAbonnementRepository: Repository<TypeAbonnementEntity>,
        @InjectRepository(AbonnementEntity)
        private readonly abonnementService: AbonnementService,
        
      ) {}
    
      async findAll(): Promise<TypeAbonnementEntity[]> {
        return this.typeAbonnementRepository.find();
      }
    
      async findById(id: number): Promise<TypeAbonnementEntity | undefined> {
        return this.typeAbonnementRepository.findOne({where:{id}});
      }

      async create(dto: CreateTypeAbonnementDTO): Promise<TypeAbonnementEntity> {
        try {
          const typeAbonnement = await this.typeAbonnementRepository.findOne({ where: { type: dto.type } });
          if (typeAbonnement) {
            throw new ConflictException('Ce type existe déjà.');
          }          
    
          const newTypeAbonnement = new TypeAbonnementEntity();
          newTypeAbonnement.type = dto.type;
          newTypeAbonnement.tarif = dto.tarif;
    
        //   if (dto.abonnementId) {            
        //     const abonnement = await this.abonnementService.findById(dto.abonnementId);
        //     if (!abonnement) {
        //       throw new NotFoundException('Abonnement introuvable.');
        //     }
        //     newTypeAbonnement.abonnements = [abonnement]; 
        //   }
    
          const savedType = await this.typeAbonnementRepository.save(newTypeAbonnement);
    
          console.log('in service', savedType);
          return savedType;
        } catch (error) {
          throw new InternalServerErrorException(
            error,
            'Une erreur est survenue lors de la création du type d\'abonnement.',
          );
        }
      }





    
    //   async create(typeAbonnement: TypeAbonnementEntity): Promise<TypeAbonnementEntity> {
    //     return this.typeAbonnementRepository.save(typeAbonnement);
    //   }

            
    //   async create(dto: CreateTypeAbonnementDTO): Promise<TypeAbonnementEntity> {
    //     try {
    //       const typeAbonnement = await this.findByType(dto.type);
    //       if (typeAbonnement) {
    //         throw new ConflictException('Ce type existe déjà.');
    //       }          
    
    //       const type = new TypeAbonnementEntity();
    //       type.tarif = dto.tarif;
    //       type.tarif = dto.tarif 
    
    //       const savedType = await this.typeAbonnementRepository.save(type);
    
    //       console.log('in service', savedType);
    //       return savedType;
    //     } catch (error) {
    //       throw new InternalServerErrorException(
    //         error,
    //         'Une erreur est survenue lors de la création du level.',
    //       );
    //     }
    //   }

      async findByType(type: string): Promise<TypeAbonnementEntity | undefined> {
        return this.typeAbonnementRepository.findOne({ where: { type } });
      }












    
      async update(id: number, typeAbonnement: TypeAbonnementEntity): Promise<TypeAbonnementEntity | undefined> {
        await this.typeAbonnementRepository.update(id, typeAbonnement);
        return this.findById(id);
      }
    
      async delete(id: number): Promise<void> {
        await this.typeAbonnementRepository.delete(id);
      }
}
