export class RoomReservation {
    constructor(public StartDate?: Date, public EndData?: Date, 
    public AppUserId?: number, public RoomId?: number, public IsCanceled?: boolean) { }
}