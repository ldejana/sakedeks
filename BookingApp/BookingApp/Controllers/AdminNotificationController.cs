﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookingApp.Hubs;

namespace BookingApp.Controllers
{
    [RoutePrefix("api")]
    public class AdminNotificationController : ApiController
    {
        public static int ClickCount { get; set; }
        // GET: api/WSClick

        [HttpPost]
        [Route("NotifyAdmin")]
        public IHttpActionResult Post()
        {
           // NotificationHub.Notify(++ClickCount);
            return Ok("Hello");
        }
    }
}
