import { IsNotEmpty } from "class-validator";
import { Compare } from "src/shared/security/decorators/isGreaterThanDate.decorator";


export class CreateHoraireDto {
    @IsNotEmpty()
    heureDebut: Date;   
    
    @IsNotEmpty()
    @Compare(({heureDebut, heureFin}: CreateHoraireDto) => heureDebut < heureFin, { message: "L'heure de fin de l'horaire doit etre postérieur à l'heure de début de l'horaire" })
    heureFin: Date; 

    @IsNotEmpty()
    jour: string; 
    
}