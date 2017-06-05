namespace BookingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RegionCountry : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Regions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        CountryId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Countries", t => t.CountryId, cascadeDelete: true)
                .Index(t => t.CountryId);
            
            CreateTable(
                "dbo.Countries",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 50),
                        Code = c.String(nullable: false, maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Accommodations", "PlaceId", c => c.Int(nullable: false));
            AddColumn("dbo.Places", "RegionId", c => c.Int(nullable: false));
            CreateIndex("dbo.Accommodations", "PlaceId");
            CreateIndex("dbo.Places", "RegionId");
            AddForeignKey("dbo.Places", "RegionId", "dbo.Regions", "Id", cascadeDelete: true);
            AddForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Accommodations", "PlaceId", "dbo.Places");
            DropForeignKey("dbo.Places", "RegionId", "dbo.Regions");
            DropForeignKey("dbo.Regions", "CountryId", "dbo.Countries");
            DropIndex("dbo.Regions", new[] { "CountryId" });
            DropIndex("dbo.Places", new[] { "RegionId" });
            DropIndex("dbo.Accommodations", new[] { "PlaceId" });
            DropColumn("dbo.Places", "RegionId");
            DropColumn("dbo.Accommodations", "PlaceId");
            DropTable("dbo.Countries");
            DropTable("dbo.Regions");
        }
    }
}
