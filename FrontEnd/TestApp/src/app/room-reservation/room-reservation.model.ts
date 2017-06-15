import { Room } from "app/room/room.model";

export class RoomReservation {
    constructor(public Id?: number, public StartDate?: Date, public EndData?: Date, 
    public AppUserId?: number, public RoomId?: number, public Room?: Room, public IsCanceled?: boolean) { }
}