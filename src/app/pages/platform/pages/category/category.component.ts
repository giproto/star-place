import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CategoryController } from '../../../../domain/controllers/category.controller';
import { CategoryEntity } from '../../../../domain/entities/category.entity';

@Component({
    selector: 'category-page',
    templateUrl: 'category.component.html',
    styleUrl: 'category.component.scss',
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
    ],
})

export class CategoryPageComponent implements OnInit
{
    public categoryForm: FormGroup;

    // * Injects
    private _categoryController = inject(CategoryController);

    ngOnInit(): void 
    {
        this.buildForm();
    }

    // Construção e preenchimento de um formulário
    public buildForm(): void
    {
        this.categoryForm = new FormGroup({
            name: new FormControl(null, [Validators.required, Validators.minLength(5)]),
            description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
        });
    }

    // Método que verifica se o formulário é válido e salva os dados
    public saveNewCategory(): void
    {
        if (this.categoryForm.invalid) 
        {
            this.categoryForm.markAllAsTouched();
            return;
        }
        
        // Atribuição de valor dos campos digitados
        const category = new CategoryEntity();
        category.name = this.categoryForm.get('name').value;
        category.description = this.categoryForm.get('description').value;

        // Executa a request em caso do formulário ser válido
        this._categoryController.saveNewCategory(category).subscribe({
            next: () => this.categoryForm.reset(),
            error: (error) => console.error('Erro ao salvar categoria: ', error),
        });
    }

    // Método que valida se o campo está ou não preenchido
    public invalidField(fieldName: string): boolean
    {
        const field = this.categoryForm.get(fieldName);
        return field?.invalid && field?.touched;
    }
}