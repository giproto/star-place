import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryEntity } from '../entities/category.entity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryAPI
{
    public apiUrl: string = environment.apiUrl + '/categories';

    // * Injects
    private _httpClient = inject(HttpClient);

    // Método para salvar uma nova categoria non banco de dados
    public saveNewCategory(category: CategoryEntity): Observable<CategoryEntity>
    {
        return this._httpClient.post<CategoryEntity>(this.apiUrl, category);
    }

    // Método para pegar todas as categorias do banco de dados
    public getAllCategories(): Observable<CategoryEntity[]>
    {
        return this._httpClient.get<CategoryEntity[]>(this.apiUrl);
    }
}