namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomReservation_TimeStamp_Removed : DbMigration
    {
        public override void Up()
        {
            DropColumn("dbo.RoomReservations", "TimeStamp");
        }
        
        public override void Down()
        {
            AddColumn("dbo.RoomReservations", "TimeStamp", c => c.DateTime(nullable: false));
        }
    }
}
