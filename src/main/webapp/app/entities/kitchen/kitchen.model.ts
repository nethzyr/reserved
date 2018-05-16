import {BaseEntity} from './../../shared';

export class Kitchen implements BaseEntity {
    constructor(
        public id?: number,
        public typeEng?: string,
        public typeHun?: string,
    ) {
    }
}
