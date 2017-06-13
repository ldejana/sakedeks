import { Accommodation } from "app/accommodation/accommodation.model";

export class Room {
    constructor(public Id?: number, public RoomNumber?: number, public BedCount?: number, public Description?: string,
    public PricePerNight?: number, public AccomodationId?: number, public Accommodation?: Accommodation) {
        
    }
}