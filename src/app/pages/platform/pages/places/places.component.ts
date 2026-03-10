import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryEntity } from '../../../../domain/entities/category.entity';
import { CategoryController } from '../../../../domain/controllers/category.controller';
import { PlaceEntity } from '../../../../domain/entities/place.entity';
import { PlaceController } from '../../../../domain/controllers/places.controller';

@Component({
    selector: 'places-page',
    templateUrl: 'places.component.html',
    styleUrl: 'places.component.scss',
    imports: [ 
        CommonModule, 
        ReactiveFormsModule
    ],
})

export class PlacesPageComponent implements OnInit
{
    public placeForm: FormGroup;
    public categories = signal<CategoryEntity[]>([]);
    public places = signal<PlaceEntity[]>([]);

    // * Injects
    private _categoryController = inject(CategoryController);
    private _placeController = inject(PlaceController);

    ngOnInit(): void 
    {
        this.buildForm();
        this.getAllCategories();
    }

    // Construção e preenchimento de um formulário
    public buildForm(): void
    {
        this.placeForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            category: new FormControl(null, [Validators.required]),
            location: new FormControl(null, [Validators.required, Validators.minLength(10)]),
            imageUrl: new FormControl(null, [Validators.required, Validators.minLength(8)]),
            feedback: new FormControl(null, [Validators.required]),
        });
    }

   // Método que verifica se o formulário é válido e salva os dados
    public saveNewPlace(): void
    {
        if(this.placeForm.invalid)
        {
            this.placeForm.markAllAsTouched();
            return;
        }

        // Atribuição de valores dos campos digitados
        const place = new PlaceEntity();
        place.name = this.placeForm.get('name').value;
        place.category = this.placeForm.get('category').value;
        place.location = this.placeForm.get('location').value;
        place.imageUrl = this.placeForm.get('imageUrl').value;
        place.feedback = this.placeForm.get('feedback').value;

        // Executa a request em caso do formulário ser válido
        this._placeController.saveNewPlace(place).subscribe({
            next: (response) => {
                console.log('Lugar salvo com sucesso: ', response);
                this.placeForm.reset();
            },
            error: (error) => console.error('Erro ao salvar lugar: ', error),
        });
    }

    // Método que executa a request para obter os lugares cadastrados
    public getAllPlaces(): void
    {
        this._placeController.getAllPlaces().subscribe({
            next: (listPlaces) => this.places.set(listPlaces),
            error: (error) => console.error('Erro ao buscar lugares: ', error)
        });
    }

    // Método que valida se o campo está ou não preenchido
    public invalidField(fieldName: string): boolean
    {
        const field = this.placeForm.get(fieldName);
        return field?.invalid && field?.touched;
    }

    // Método para obter as categorias cadastradas
    public getAllCategories(): void
    {
        this._categoryController.getAllCategories().subscribe({
            next: (listCategories) => this.categories.set(listCategories),
            error: (error) => console.error('Erro ao buscar categorias: ', error)
        });
    }
}