import {BaseEntity} from './../../shared';

export class Food implements BaseEntity {
    constructor(
        public id?: number,
        public typeEng?: string,
        public typeHun?: string,
    ) {
    }
}
