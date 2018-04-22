import { BaseEntity } from './../../shared';

export class Picture implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public url?: string,
        public imgContentType?: string,
        public img?: any,
    ) {
    }
}
