import { IsNotEmpty, IsDate, IsNumber } from "class-validator";

export class CreateAbonnementDTO {
    @IsNotEmpty()
    @IsDate()
    dateDebut: Date;
  
    @IsNotEmpty()
    @IsDate()
    dateFin: Date;
  
    @IsNotEmpty()
    @IsNumber()
    userId: number; 
  
    @IsNotEmpty()
    @IsNumber()
    typeAbonnementId: number; 
  }