import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

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

    // Método que salva os dados preenchidos no formulário
    public save(): void
    {
        this.categoryForm.markAllAsTouched();

        if(this.categoryForm.valid)
        {
            console.log('Valores digitados: ', this.categoryForm.value);
            console.log('Está válido?', this.categoryForm.value);
        }
    }

    // Método que valida se o campo está ou não preenchido
    public invalidField(fieldName: string): boolean
    {
        const field = this.categoryForm.get(fieldName);
        return field?.invalid && field?.touched && field?.errors?.['required'];
    }
}