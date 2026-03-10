import { Injectable, inject } from "@angular/core";
import { PlaceAPI } from "../API/places.api";
import { Observable } from "rxjs";
import { PlaceEntity } from "../entities/place.entity";

@Injectable({
    providedIn:'root'
})

export class PlaceController 
{
    // * Injects
    private _placeAPI = inject(PlaceAPI);

    // Método para salvar um novo lugar
    public saveNewPlace(place: PlaceEntity): Observable<PlaceEntity>
    {
        return this._placeAPI.saveNewPlace(place);
    }

    // Método para obter todos os lugares cadastrados
    public getAllPlaces(): Observable<PlaceEntity[]>
    {
        return this._placeAPI.getAllPlaces();
    }

    // Método para filtrar por nome e categoria
    public filter(name: string, category: string): Observable<PlaceEntity[]>
    {
        if (name == 'null') name = null;
        if (category == 'null') category = null;

        return this._placeAPI.filter(name, category);
    } 
}