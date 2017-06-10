insert into dbo.Countries (Name, Code) values ('Serbia', 'SRB')
insert into dbo.AccommodationTypes (Name) values ('House')
insert into dbo.Regions (Name, CountryId) values ('Vojvodina', 1)
insert into dbo.Places (Name, RegionId) values ('Novi Sad', 1)
insert into dbo.Accommodations (Name, Latitude, Longitude, Approved, AccommodationTypeId, PlaceId, OwnerId) values
('Stari krovovi', 5, 5, 1, 1, 1, 10)