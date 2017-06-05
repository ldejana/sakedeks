namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccommodationRoomRelationship : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rooms", "AccomodationId", c => c.Int(nullable: false));
            AlterColumn("dbo.Accommodations", "AverageGrade", c => c.Decimal(precision: 18, scale: 2));
            CreateIndex("dbo.Rooms", "AccomodationId");
            AddForeignKey("dbo.Rooms", "AccomodationId", "dbo.Accommodations", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rooms", "AccomodationId", "dbo.Accommodations");
            DropIndex("dbo.Rooms", new[] { "AccomodationId" });
            AlterColumn("dbo.Accommodations", "AverageGrade", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            DropColumn("dbo.Rooms", "AccomodationId");
        }
    }
}
