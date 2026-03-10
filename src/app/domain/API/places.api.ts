import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { PlaceEntity } from "../entities/place.entity";

@Injectable({
    providedIn: 'root'
})

export class PlaceAPI
{
    // * Injects
    private _httpCliente = inject(HttpClient);

    // Método para salvar um novo lugar no banco de dados
    public saveNewPlace(place: PlaceEntity): Observable<PlaceEntity>
    {
        return this._httpCliente.post<PlaceEntity>('http://localhost:3000/places', place);
    }

    // Método para pegar todos os lugares do banco de dados
    public getAllPlaces(): Observable<PlaceEntity[]>
    {
        return this._httpCliente.get<PlaceEntity[]>('http://localhost:3000/places');
    }

    // Método para filtrar por nome e categoria
    public filter(name: string, category: string): Observable<PlaceEntity[]>
    {
        let params = new HttpParams();

        if(name) params = params.set('name_like', name);
        if(category) params = params.set('category', category)

        return this._httpCliente.get<PlaceEntity[]>('http://localhost:3000/places', { params });
    }
}