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
        private BAContext db = new BAContext();

        [HttpPut]
        [Route("NotifyManager/{id}")]
        public IHttpActionResult Put(int id)
        {
            //int accId = 0;
            //bool isInt = Int32.TryParse(id, out accId);
            Accommodation accommodation = db.Accommodations.Where(acc => acc.Id == id).FirstOrDefault();

            if (accommodation == null)
            {
                return BadRequest();
            }
            accommodation.Approved = true;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Entry(accommodation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            NotificationHub.NotifyManager(accommodation.OwnerId, accommodation.Name);
            
            // NotificationHub.Notify(++ClickCount);
            return Ok("Hello");
        }
    }
}
