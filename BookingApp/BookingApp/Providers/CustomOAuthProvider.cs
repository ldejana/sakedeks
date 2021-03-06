﻿using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using BookingApp.Models;

namespace BookingApp.Providers
{
    public class CustomOAuthProvider : Microsoft.Owin.Security.OAuth.OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            try
            {
                var allowedOrigin = "*";
                context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

                var roleHeader = "Role";
                var userIdHeader = "UserId";
                var userNameHeader = "UserName";
                context.OwinContext.Response.Headers.Add("Access-Control-Expose-Headers", new[] { roleHeader, userIdHeader, userNameHeader });

                ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

                BAIdentityUser user = await userManager.FindAsync(context.UserName, context.Password);


                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.!!!!");
                    return;
                }

                BAContext BAContext = new BAContext();
                var userRole = user.Roles.First().RoleId;
                var role = BAContext.Roles.FirstOrDefault(r => r.Id == userRole);

                //BAContext.Roles.Where(x => 
                //bool isAdmin = await userManager.IsInRoleAsync(user.UserName, "Admin");



                if (role.Name.Equals("Admin"))
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "Admin" });
                }
                else if (role.Name.Equals("Manager"))
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "Manager" });
                }
                else
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "User" });
                }

                context.OwinContext.Response.Headers.Add("UserId", new[] { user.AppUserId.ToString() });


                if (role.Name.Equals("Admin"))
                {
                    string username = "Admin: " + user.Email;
                    context.OwinContext.Response.Headers.Add("UserName", new[] { username });
                }
                else
                {
                    AppUser appUser = BAContext.AppUsers.Where(au => au.Id == user.AppUserId).FirstOrDefault();
                    string username = role.Name + ": " + appUser.Name + " " + appUser.LastName;
                    context.OwinContext.Response.Headers.Add("UserName", new[] { username });
                }
           
                ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");

                var ticket = new AuthenticationTicket(oAuthIdentity, null);

                context.Validated(ticket);
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
            }

        }
    }
}