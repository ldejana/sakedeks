using BookingApp.Models;
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
    public class RoomReservationController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [EnableQuery]
        [Route("RoomReservations")]
        public IQueryable<RoomReservation> GetRoomReservations()
        {
            return db.RoomReservations;
        }

        [HttpGet]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult GetRoomReservation(int id)
        {
            RoomReservation roomReservation = db.RoomReservations.Find(id);
            if (roomReservation == null)
            {
                return NotFound();
            }

            return Ok(roomReservation);
        }

        [Authorize]
        [HttpPut]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoomReservation(int id, RoomReservation roomReservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomReservation.Id)
            {
                return BadRequest();
            }

            db.Entry(roomReservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomReservationExists(id))
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

        [Authorize]
        [HttpPost]
        [Route("RoomReservations")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult PostRoomReservation(RoomReservation newRoomReservation)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isUser = role.Name.Equals("AppUser");

                if (isUser)
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    bool exist = false;
                    using (var context = new BAContext())
                    {
                        // Query for all blogs with names starting with B 
                        var reservations = from b in context.RoomReservations
                                           where (b.RoomId == newRoomReservation.RoomId && b.IsCanceled == false)
                                           select b;

                        foreach (var item in reservations)
                        {
                            if (!((newRoomReservation.StartDate < item.StartDate &&
                                newRoomReservation.EndData <= item.StartDate) ||
                               (newRoomReservation.StartDate >= item.EndData &&
                                newRoomReservation.EndData > item.EndData)))
                            {
                                exist = true;
                                break;
                            }
                        }

                    }

                    if (!exist)
                    {
                        db.RoomReservations.Add(newRoomReservation);
                        db.SaveChanges();

                        return CreatedAtRoute("DefaultApi", new { controller = "RoomReservation", id = newRoomReservation.Id }, newRoomReservation);
                    } 
                    else
                    {
                        return BadRequest("Room is not available at that time.");
                    }

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

        [Authorize]
        [HttpDelete]
        [Route("RoomReservations/{id}")]
        [ResponseType(typeof(RoomReservation))]
        public IHttpActionResult DeleteRoomReservation(int id)
        {
            RoomReservation roomReservation = db.RoomReservations.Find(id);
            if (roomReservation == null)
            {
                return NotFound();
            }

            db.RoomReservations.Remove(roomReservation);
            db.SaveChanges();

            return Ok(roomReservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RoomReservationExists(int id)
        {
            return db.RoomReservations.Count(e => e.Id == id) > 0;
        }
    }
}
