﻿using BookingApp.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookingApp.Controllers
{
    public class WSClickController : ApiController
    {
        public static int ClickCount { get; set; }
        // GET: api/WSClick
        public IHttpActionResult Post()
        {
            NotificationHub.Notify(++ClickCount);
            return Ok("Hello");
        }
    }
}
