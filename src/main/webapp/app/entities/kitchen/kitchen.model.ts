import { BaseEntity } from './../../shared';

export class Kitchen implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
    ) {
    }
}
