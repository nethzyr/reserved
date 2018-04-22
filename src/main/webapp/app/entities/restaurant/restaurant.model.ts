import { BaseEntity, User } from './../../shared';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public created?: any,
        public streetAddress?: string,
        public postalCode?: string,
        public info?: any,
        public email?: string,
        public phone?: string,
        public website?: string,
        public facebook?: string,
        public googlePlaceId?: string,
        public city?: BaseEntity,
        public kitchens?: BaseEntity[],
        public foods?: BaseEntity[],
        public pictures?: BaseEntity[],
        public users?: User[],
    ) {
    }
}
