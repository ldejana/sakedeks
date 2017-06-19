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
    public class CommentController : ApiController
    {
        private BAContext db = new BAContext();

        // GET: api/Comments
        [HttpGet]
        [EnableQuery]
        [Route("Comments")]
        public IQueryable<Comment> GetComments()
        {
            return db.Comments;
        }

        // GET: api/Comments/5/3
        [HttpGet]
        [EnableQuery]
        [Route("Comments/{id1}/{id2}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult GetComment(int id1, int id2)
        {
            Comment comment = db.Comments.Find(new { AppUserId = id1, AccommodationId = id2 });
            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        // PUT: api/Comments/5
        [HttpPut]
        [Authorize]
        [Route("Comments")]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutComments(int id1, int id2, Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id1 != comment.AppUserId || id2 != comment.AccommodationId)
            {
                return BadRequest();
            }

            db.Entry(comment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id1, id2))
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

        // POST: api/Comments
        [HttpPost]
        [Authorize]
        [Route("Comments")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult PostComment(Comment comment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);
            BAContext BAContext = new BAContext();
            var userRole = user.Roles.First().RoleId;
            var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
            bool isAppUser = role.Name.Equals("AppUser");

            if (!isAppUser)
            {
                return Unauthorized();
            }

            using (var context = new BAContext())
            {
                var reservations = from b in context.RoomReservations
                                   where (b.AppUserId == comment.AppUserId && b.IsCanceled == false &&
                                          b.Room.AccomodationId == comment.AccommodationId)
                                   select b;

                foreach (var item in reservations)
                {
                    if (item.StartDate < DateTime.Now)
                    {
                        try
                        {
                            db.Comments.Add(comment);
                            db.SaveChanges();

                        }
                       catch(Exception e)
                        {
                            return BadRequest("Cannot add comment.");
                        }

                        List<Comment> allComments = db.Comments.Where(cm => cm.AccommodationId == comment.AccommodationId).ToList();
                        decimal sum = 0;
                        decimal averageGrade;

                        foreach (Comment comm in allComments)
                        {
                            sum += (decimal)comm.Grade;
                        }

                        averageGrade = sum / allComments.Count;

                        Accommodation acc = db.Accommodations.Where(accomm => accomm.Id == comment.AccommodationId).FirstOrDefault();
                        if (acc == null)
                        {
                            return BadRequest("Cannot refresh average grade.");
                        }
                        acc.AverageGrade = averageGrade;

                        db.Entry(acc).State = EntityState.Modified;

                        try
                        {
                            db.SaveChanges();
                        }
                        catch (DbUpdateConcurrencyException)
                        {
                            return BadRequest("Cannot refresh average grade.");
                        }

                        return CreatedAtRoute("DefaultApi", new { controller = "Comment" /*, Id = place.Id*/ }, comment);
                    }
                }
            }
            return Unauthorized();
        }

        // DELETE: api/Comments/5
        [HttpDelete]
        [Authorize]
        [Route("Comments/{id1}/{id2}")]
        [ResponseType(typeof(Comment))]
        public IHttpActionResult DeleteComment(int id1, int id2)
        {
            var user = db.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

            if(user == null)
            {
                return Unauthorized();
            }

            BAContext BAContext = new BAContext();
            var userRole = user.Roles.First().RoleId;
            var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);
            bool isAppUser = role.Name.Equals("AppUser");

            if (!isAppUser)
            {
                return Unauthorized();
            }



            Comment comment = db.Comments.Find(id1, id2);
            if (comment == null)
            {
                return NotFound();
            }

            db.Comments.Remove(comment);
            db.SaveChanges();

            return Ok(comment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }


        private bool CommentExists(int id1, int id2)
        {
            Comment comment = db.Comments.Find(new { AppUserId = id1, AccommodationId = id2 });
            if (comment == null)
                return false;

            return true;
        }
    }
}
