using BookingApp.Models;
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
    public class RoomController : ApiController
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
        [Route("Rooms")]
        [EnableQuery]
        public IQueryable<Room> GetRooms()
        {
            return db.Rooms;
        }

        [HttpGet]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult GetRoom(int id)
        {
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        //[Authorize]
        [HttpPut]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRoom(int id, Room room)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isManager = role.Name.Equals("Manager");

                if (isManager && (user != null && room.Accommodation != null && room.Accommodation.OwnerId == user.AppUserId))
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    if (id != room.Id)
                    {
                        return BadRequest();
                    }

                    db.Entry(room).State = EntityState.Modified;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!RoomExists(id))
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

        
        [HttpPost]
        [Route("Rooms")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult PostRoom(Room room)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isManager = role.Name.Equals("Manager");

                if (isManager && (user != null && room.Accommodation != null && room.Accommodation.OwnerId == user.AppUserId))
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    db.Rooms.Add(room);
                    db.SaveChanges();

                    return CreatedAtRoute("DefaultApi", new { controller = "Room", id = room.Id }, room);
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

        //[Authorize]
        [HttpDelete]
        [Route("Rooms/{id}")]
        [ResponseType(typeof(Room))]
        public IHttpActionResult DeleteRoom(int id)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return NotFound();
            }

            if (user != null)
            {
                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
                bool isManager = role.Name.Equals("Manager");

                if (isManager && (user != null && room.Accommodation != null && room.Accommodation.OwnerId == user.AppUserId))
                {

                    //IQueryable<RoomReservation> roomReservations = db.RoomReservations.Where(rr => rr.RoomId == room.Id);

                    //foreach (RoomReservation roomReservation in roomReservations)
                    //{
                    //    db.RoomReservations.Remove(roomReservation);
                    //}

                    db.Rooms.Remove(room);
                    db.SaveChanges();

                    return Ok(room);
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

        private bool RoomExists(int id)
        {
            return db.Rooms.Count(e => e.Id == id) > 0;
        }
    }
}
