using BookingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
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
using System.Web.Security;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class MyUserController : ApiController
    {
        private BAContext db = new BAContext();

        [HttpGet]
        [Route("Users")]
        //[EnableQuery]
        public List<AppUser> GetUsers()
        {
            List<AppUser> appUsers = new List<AppUser>();

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();
            foreach (var user in users)
            {
                appUsers.Add(user.AppUser);
            }

            return appUsers;
        }

        [HttpGet]
        [Route("AppUsers")]
        //[EnableQuery]
        public List<AppUser> GetAppUsers()
        {
            List<AppUser> appUsers = new List<AppUser>();

            var role = db.Roles.Where(r => r.Name.Equals("AppUser")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();
            foreach (var user in users)
            {
                appUsers.Add(user.AppUser);
            }

            return appUsers;
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
        [Route("UserBan/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult BanUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = db.AppUsers.Where(au => au.Id == id).FirstOrDefault();
            bool isManager = false;

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();
            foreach (var user in users)
            {
                if (user.AppUser.Id == id)
                {
                    isManager = true;
                    break;
                }
            }


            if (appUser == null || !isManager)
            {
                return BadRequest();
            }

            appUser.IsBanned = true;


            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [HttpPut]
        //[Authorize(Roles = "Admin")]
        [Route("UserUnban/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult UnbanUser(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            AppUser appUser = db.AppUsers.Where(au => au.Id == id).FirstOrDefault();
            bool isManager = false;

            var role = db.Roles.Where(r => r.Name.Equals("Manager")).FirstOrDefault();
            var users = role.Users.Join(db.Users, u1 => u1.UserId, u2 => u2.Id, (u1, u2)
            => new { UserRole = u1, User = u2 }).Select(x => x.User.AppUserId).Join(db.AppUsers, u3 => u3, u4 => u4.Id, (u3, u4) => new { AppUser = u4 }).ToList();
            foreach (var user in users)
            {
                if (user.AppUser.Id == id)
                {
                    isManager = true;
                    break;
                }
            }


            if (appUser == null || !isManager)
            {
                return BadRequest();
            }

            appUser.IsBanned = false;


            db.Entry(appUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
    }
}
