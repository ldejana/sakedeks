namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AccommodationTypeNameIsUnique : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.AccommodationTypes", "Name", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.AccommodationTypes", new[] { "Name" });
        }
    }
}
