using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AccommodationController : ApiController
    {
        private BAContext db = new BAContext();

        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]
        [Route("Accommodations")]
        [EnableQuery]
        public IQueryable<Accommodation> m1()
        {
            return db.Accommodations;
        }

        [HttpGet]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult m2(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            return Ok(accommodation);
        }

        [HttpGet]
        [EnableQuery]
        [Route("Accommodations/CountryId/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IQueryable<Accommodation> GetAccommodationsByCountryId(int id)
        {
            IQueryable<Accommodation> queryableAccommodation =
                                        from country in db.Countries
                                        join region in db.Regions on country.Id equals region.CountryId
                                        join place in db.Places on region.Id equals place.RegionId
                                        join accommodation in db.Accommodations on place.Id equals accommodation.PlaceId
                                        where country.Id == id
                                        select accommodation;

            return queryableAccommodation;
        }

        [HttpGet]
        [EnableQuery]
        [Route("Accommodations/RegionId/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IQueryable<Accommodation> GetAccommodationsByRegionId(int id)
        {
            IQueryable<Accommodation> queryableAccommodation =
                                        from region in db.Regions
                                        join place in db.Places on region.Id equals place.RegionId
                                        join accommodation in db.Accommodations on place.Id equals accommodation.PlaceId
                                        where region.Id == id
                                        select accommodation;

            return queryableAccommodation;
        }

        [HttpGet]
        [EnableQuery]
        [Route("Accommodations/PlaceId/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IQueryable<Accommodation> GetAccommodationsByPlaceId(int id)
        {
            IQueryable<Accommodation> queryableAccommodation =
                                        from place in db.Places
                                        join accommodation in db.Accommodations on place.Id equals accommodation.PlaceId
                                        where place.Id == id
                                        select accommodation;

            return queryableAccommodation;
        }

        //[Authorize]
        [HttpPut]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult m3(int id, Accommodation accommodation)
        {
           // bool isManager = UserManager.IsInRole(User.Identity.Name, "Manager");
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isManager = role.Name.Equals("Manager");
                if (isManager && (user != null && accommodation != null && accommodation.OwnerId == user.AppUserId))
                {

                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    if (id != accommodation.Id)
                    {
                        return BadRequest();
                    }

                    db.Entry(accommodation).State = EntityState.Modified;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!AccommodationExists(id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return StatusCode(HttpStatusCode.NoContent);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        [Authorize(Roles = "Manager")]
        [HttpPost]
        [Route("Accommodations")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult PostAccommodation(Accommodation accommodation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Accommodations.Add(accommodation);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { controller = "Accommodation", id = accommodation.Id }, accommodation);
        }

        [Authorize]
        [HttpDelete]
        [Route("Accommodations/{id}")]
        [ResponseType(typeof(Accommodation))]
        public IHttpActionResult DeleteAccommodation(int id)
        {
            Accommodation accommodation = db.Accommodations.Find(id);
            if (accommodation == null)
            {
                return NotFound();
            }

            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isManager = role.Name.Equals("Manager");

                if (isManager)
                {
                    db.Accommodations.Remove(accommodation);
                    db.SaveChanges();

                    return Ok(accommodation);
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int id)
        {
            return db.Accommodations.Count(e => e.Id == id) > 0;
        }
    }
}
