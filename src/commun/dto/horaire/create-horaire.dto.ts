import { IsNotEmpty } from "class-validator";
import { IsGreaterThanDate } from "src/shared/security/decorators/isGreaterThanDate.decorator";


export class CreateHoraireDto {
    @IsNotEmpty()
    heureDebut: Date;   
    
    @IsNotEmpty()

    @IsGreaterThanDate('heureDebut',{ message: "heureFin doit etre plus grand qu'heureDebut" })

    heureFin: Date; 

    @IsNotEmpty()
    jour: Date; 
    
}