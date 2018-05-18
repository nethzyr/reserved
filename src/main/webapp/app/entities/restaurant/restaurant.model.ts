import {BaseEntity, User} from './../../shared';

export class Restaurant implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public infoEng?: string,
        public infoHun?: string,
        public email?: string,
        public phone?: string,
        public website?: string,
        public facebook?: string,
        public googlePlaceId?: string,
        public rating?: number,
        public lat?: number,
        public lng?: number,
        public visible?: boolean,
        public comments?: BaseEntity[],
        public city?: BaseEntity,
        public user?: User,
        public picture?: BaseEntity,
        public kitchens?: BaseEntity[],
        public foods?: BaseEntity[],
    ) {
        this.visible = false;
    }
}
