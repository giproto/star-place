import { v4 as uuidv4 } from 'uuid';

export class CategoryEntity
{
    id?: string;
    name?: string;
    description?: string;

    constructor() {
        this.id = uuidv4();
    }
}
