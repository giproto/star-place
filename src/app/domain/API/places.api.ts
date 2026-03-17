import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { PlaceEntity } from "../entities/place.entity";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class PlaceAPI
{
    public apiUrl: string = environment.apiUrl + '/places';

    // * Injects
    private _httpCliente = inject(HttpClient);

    // Método para salvar um novo lugar no banco de dados
    public saveNewPlace(place: PlaceEntity): Observable<PlaceEntity>
    {
        return this._httpCliente.post<PlaceEntity>(this.apiUrl, place);
    }

    // Método para pegar todos os lugares do banco de dados
    public getAllPlaces(): Observable<PlaceEntity[]>
    {
        return this._httpCliente.get<PlaceEntity[]>(this.apiUrl);
    }

    // Método para filtrar por nome e categoria
    public filter(name: string, category: string): Observable<PlaceEntity[]>
    {
        let params = new HttpParams();

        if(name) params = params.set('name_like', name);
        if(category) params = params.set('category', category)

        return this._httpCliente.get<PlaceEntity[]>(this.apiUrl, { params });
    }
}