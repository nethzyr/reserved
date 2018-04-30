import {BaseEntity, User} from './../../shared';

export class UserInfo implements BaseEntity {
    constructor(
        public id?: number,
        public facebook?: string,
        public phone?: string,
        public user?: User,
        public picture?: BaseEntity,
        public preferredCities?: BaseEntity[],
        public favoriteRestaurants?: BaseEntity[],
        public favoriteKitchens?: BaseEntity[],
        public favoriteFoods?: BaseEntity[],
    ) {
    }
}
