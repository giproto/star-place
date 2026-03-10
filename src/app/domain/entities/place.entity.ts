import { v4 as uuidv4 } from 'uuid';

export class PlaceEntity
{
    id: string;
    name?: string;
    category?: string;
    location?: string;
    imageUrl?: string;
    feedback?: number;

    constructor() {
        this.id = uuidv4();
    }
}