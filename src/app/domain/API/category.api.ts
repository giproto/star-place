import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryEntity } from '../entities/category.entity';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryAPI
{
    // * Injects
    private _httpClient = inject(HttpClient);

    // Método para salvar uma nova categoria non banco de dados
    public saveNewCategory(category: CategoryEntity): Observable<CategoryEntity>
    {
        return this._httpClient.post<CategoryEntity>('http://localhost:3000/categories', category);
    }

    // Método para pegar todas as categorias do banco de dados
    public getAllCategories(): Observable<CategoryEntity[]>
    {
        return this._httpClient.get<CategoryEntity[]>('http://localhost:3000/categories');
    }
}