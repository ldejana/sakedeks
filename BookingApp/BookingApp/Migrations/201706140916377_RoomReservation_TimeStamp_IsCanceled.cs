namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomReservation_TimeStamp_IsCanceled : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RoomReservations", "Timestamp", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.RoomReservations", "IsCanceled", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RoomReservations", "IsCanceled");
            DropColumn("dbo.RoomReservations", "Timestamp");
        }
    }
}
