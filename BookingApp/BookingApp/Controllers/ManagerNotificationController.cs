using BookingApp.Hubs;
using BookingApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class ManagerNotificationController : ApiController
    {
        private object lockObject = new object();
        private BAContext db = new BAContext();

        [HttpPut]
        [Authorize(Roles = "Admin")]
        [Route("NotifyManager/{id}")]
        public IHttpActionResult Put(int id)
        {
            bool isBadRequest = false;
            Accommodation accommodation;
            bool alreadyApproved = false;

            lock (lockObject)
            {
                accommodation = db.Accommodations.Where(acc => acc.Id == id).FirstOrDefault();

                if (accommodation == null)
                {
                    isBadRequest = true;
                }

                if (!ModelState.IsValid)
                {
                    isBadRequest = true;
                }

                if (accommodation.Approved)
                {
                    alreadyApproved = true;
                }
                else
                {

                    accommodation.Approved = true;
                    db.Entry(accommodation).State = EntityState.Modified;

                    try
                    {
                        db.SaveChanges();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        isBadRequest = true;
                    }
                }
            }

            if (isBadRequest)
            {
                return BadRequest();
            }

            if (!alreadyApproved)
            {
                NotificationHub.NotifyManager(accommodation.OwnerId, accommodation.Name);
            }
            
            // NotificationHub.Notify(++ClickCount);
            return Ok("Hello");
        }
    }
}
