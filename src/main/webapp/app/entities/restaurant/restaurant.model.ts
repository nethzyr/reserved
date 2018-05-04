import {BaseEntity, User} from './../../shared';
import {Picture} from '../picture';
import {City} from '../city';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public info?: string,
        public email?: string,
        public phone?: string,
        public website?: string,
        public facebook?: string,
        public googlePlaceId?: string,
        public city?: City,
        public user?: User,
        public picture?: Picture,
        public kitchens?: BaseEntity[],
        public foods?: BaseEntity[],
    ) {
    }
}
