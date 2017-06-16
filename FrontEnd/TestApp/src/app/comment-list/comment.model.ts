import { User } from "app/models/user.model";

export class Comment {
    constructor(public AppUserId?: number, public AccommodationId?: number,
                public Text?: string, public Grade?: number, public AppUser?: User) {  }
}