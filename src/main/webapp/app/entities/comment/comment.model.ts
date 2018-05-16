import {BaseEntity} from './../../shared';

export class Comment implements BaseEntity {
    constructor(
        public id?: number,
        public authorName?: string,
        public text?: string,
        public restaurant?: BaseEntity,
    ) {
    }
}
