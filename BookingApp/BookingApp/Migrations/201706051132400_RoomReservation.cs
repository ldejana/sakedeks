namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RoomReservation : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RoomReservations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTime(nullable: false),
                        EndData = c.DateTime(nullable: false),
                        TimeStamp = c.DateTime(nullable: false),
                        AppUserId = c.Int(nullable: false),
                        RoomId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: false)
                .ForeignKey("dbo.Rooms", t => t.RoomId, cascadeDelete: false)
                .Index(t => t.AppUserId)
                .Index(t => t.RoomId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RoomReservations", "RoomId", "dbo.Rooms");
            DropForeignKey("dbo.RoomReservations", "AppUserId", "dbo.AppUsers");
            DropIndex("dbo.RoomReservations", new[] { "RoomId" });
            DropIndex("dbo.RoomReservations", new[] { "AppUserId" });
            DropTable("dbo.RoomReservations");
        }
    }
}
