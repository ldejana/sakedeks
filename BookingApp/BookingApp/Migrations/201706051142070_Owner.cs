namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Owner : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Accommodations", "OwnerId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accommodations", "OwnerId");
            AddForeignKey("dbo.Accommodations", "OwnerId", "dbo.AppUsers", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accommodations", "OwnerId", "dbo.AppUsers");
            DropIndex("dbo.Accommodations", new[] { "OwnerId" });
            DropColumn("dbo.Accommodations", "OwnerId");
        }
    }
}
