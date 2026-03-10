import { Injectable, inject } from "@angular/core";
import { CategoryAPI } from "../API/category.api";
import { CategoryEntity } from "../entities/category.entity";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoryController 
{
    // * Injects
    private _categoryAPI = inject(CategoryAPI);

    // Método para salvar uma nova categoria
    public saveNewCategory(category: CategoryEntity): Observable<CategoryEntity>
    {
        return this._categoryAPI.saveNewCategory(category);
    }

    // Método para obter todas as categorias cadastradas
    public getAllCategories(): Observable<CategoryEntity[]>
    {
        return this._categoryAPI.getAllCategories();
    }

    // Método para obter nomes das categorias cadastradas
    public getNameByID(categories: CategoryEntity[], id: string): string
    {
        return categories.find(x => x.id == id).name;
    }
}
