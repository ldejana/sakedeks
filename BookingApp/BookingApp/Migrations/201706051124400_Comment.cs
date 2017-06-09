namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Comment : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        AppUserId = c.Int(nullable: false),
                        AccommodationId = c.Int(nullable: false),
                        Text = c.String(),
                        Grade = c.Double(nullable: false),
                    })
                .PrimaryKey(t => new { t.AppUserId, t.AccommodationId })
                .ForeignKey("dbo.Accommodations", t => t.AccommodationId, cascadeDelete: true)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId, cascadeDelete: false)
                .Index(t => t.AppUserId)
                .Index(t => t.AccommodationId);
            
            AddColumn("dbo.AppUsers", "Name", c => c.String(nullable: false, maxLength: 20));
            AddColumn("dbo.AppUsers", "LastName", c => c.String(nullable: false, maxLength: 20));
            DropColumn("dbo.AppUsers", "FullName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AppUsers", "FullName", c => c.Int(nullable: false));
            DropForeignKey("dbo.Comments", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.Comments", "AccommodationId", "dbo.Accommodations");
            DropIndex("dbo.Comments", new[] { "AccommodationId" });
            DropIndex("dbo.Comments", new[] { "AppUserId" });
            DropColumn("dbo.AppUsers", "LastName");
            DropColumn("dbo.AppUsers", "Name");
            DropTable("dbo.Comments");
        }
    }
}
