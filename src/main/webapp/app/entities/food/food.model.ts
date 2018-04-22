import { BaseEntity } from './../../shared';

export class Food implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
    ) {
    }
}
