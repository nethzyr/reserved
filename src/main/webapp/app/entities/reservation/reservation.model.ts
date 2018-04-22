import { BaseEntity, User } from './../../shared';

export class Reservation implements BaseEntity {
    constructor(
        public id?: number,
        public time?: any,
        public created?: any,
        public confirmed?: boolean,
        public restaurant?: BaseEntity,
        public user?: User,
    ) {
        this.confirmed = false;
    }
}
