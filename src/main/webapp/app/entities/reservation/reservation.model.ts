import {BaseEntity, User} from './../../shared';
import {Restaurant} from '../restaurant';

export class Reservation implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public people?: number,
        public confirmed?: boolean,
        public restaurant?: Restaurant,
        public user?: User,
    ) {
        this.confirmed = false;
    }
}
