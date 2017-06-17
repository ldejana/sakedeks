using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.OData;
using System.Web.Security;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class MyUserController : ApiController
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
        [Route("Users")]
        [EnableQuery]
        public IQueryable<AppUser> GetUsers()
        {
            return db.AppUsers;
        }

        [HttpGet]
        [Route("Users/{id}")]
        [ResponseType(typeof(AppUser))]
        public IHttpActionResult GetUser(int id)
        {
            AppUser appUser = db.AppUsers.Find(id);
            if (appUser == null)
            {
                return NotFound();
            }

            return Ok(appUser);
        }


        [HttpPut]
        //[Authorize(Roles = "Admin")]
        [Route("Users/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = db.AppUsers.Where(au => au.Id == id).FirstOrDefault();
            BAIdentityUser baUser = null;
            var context = new IdentityDbContext();
            var users = context.Users.ToList();
            foreach (BAIdentityUser user in context.Users.ToList())
            {
                if (user.AppUserId == appUser.Id)
                {
                    baUser = user;
                    break;
                }
            }
            bool isManager = UserManager.IsInRole(baUser.UserName, "Manager");

            if (appUser == null || !isManager)
            {
                return BadRequest();
            }


            //db.Entry(country).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CountryExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
