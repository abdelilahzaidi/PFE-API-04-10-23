import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTypeAbonnementDTO {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber()
  tarif: number;

//   @IsNotEmpty()
//   @IsNumber()
//   abonnementId: number;
}
