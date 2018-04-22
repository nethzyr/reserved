import { BaseEntity, User } from './../../shared';

export class UserInfo implements BaseEntity {
    constructor(
        public id?: number,
        public facebook?: string,
        public phone?: string,
        public picture?: BaseEntity,
        public user?: User,
        public preferredCities?: BaseEntity[],
        public favoriteRestaurants?: BaseEntity[],
    ) {
    }
}
