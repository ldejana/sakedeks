namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BAIdentityUserrr : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "AppUserId", c => c.Int());
            CreateIndex("dbo.AspNetUsers", "AppUserId");
            AddForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AspNetUsers", "AppUserId", "dbo.AppUsers");
            DropIndex("dbo.AspNetUsers", new[] { "AppUserId" });
            DropColumn("dbo.AspNetUsers", "AppUserId");
        }
    }
}
