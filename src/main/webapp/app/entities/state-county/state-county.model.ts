import {BaseEntity} from './../../shared';

export class StateCounty implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public country?: BaseEntity,
    ) {
    }
}
