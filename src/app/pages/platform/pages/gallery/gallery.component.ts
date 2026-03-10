import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { PlaceController } from '../../../../domain/controllers/places.controller';
import { CategoryController } from '../../../../domain/controllers/category.controller';
import { PlaceEntity } from '../../../../domain/entities/place.entity';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'gallery-page',
    templateUrl: 'gallery.component.html',
    styleUrl: 'gallery.component.scss',
    imports: [ 
        CommonModule, 
        ReactiveFormsModule,
    ]
})

export class GalleryPageComponent implements OnInit
{
    public filterForm: FormGroup;
    public categories = signal<CategoryEntity[]>([]);
    public places = signal<PlaceEntity[]>([]);

    // * Injects
    private _categoryController = inject(CategoryController);
    private _placeController = inject(PlaceController);

    ngOnInit(): void 
    {
        this.getAllCategories();
        this.getAllPlaces();
        this.buildForm();
    }

    // Construção do formulário de pesquisa por nome e categoria
    public buildForm(): void
    {
        this.filterForm = new FormGroup({
            name: new FormControl(null),
            category: new FormControl(null)
        });
    }

    // Método que executa a request para obter categorias cadastradas
    public getAllCategories(): void
    {
        this._categoryController.getAllCategories().subscribe({
            next: (listCategories) => this.categories.set(listCategories),
            error: (error) => console.error('Erro ao buscar categorias: ', error)
        });
    }

    // Método que executa a request para obter lugares cadastrados
    public getAllPlaces(): void
    {
        this._placeController.getAllPlaces().subscribe({
            next: (listPlaces) => this.places.set(listPlaces),
            error: (error) => console.error('Erro ao buscar lugares: ', error)
        });
    }

    // Método que executa a request para obter nomes das categorias cadastradas
    public getNameByID(id: string): string
    {
        return this._categoryController.getNameByID(this.categories(), id);
    }

    // Método que retorna nota de avaliação em estrelas
    public getAllStars(place: PlaceEntity): string
    {
        return '&#9733'.repeat(place.feedback || 0) + '&#9734'.repeat(5 - (place.feedback || 0));
    }

    // Método que executa a request para filtrar lugares por nome e categoria
    public filter(): void
    {
        const nameFilter = this.filterForm.get('name').value;
        const categoryFilter = this.filterForm.get('category').value;

        this._placeController.filter(nameFilter, categoryFilter).subscribe({
            next: (result) => this.places.set(result),
            error: (error) => console.error('Erro ao buscar lugares: ', error),
        })
    }
} 