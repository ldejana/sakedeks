using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using BookingApp.Models;
using System.Web.Http.Description;

namespace BookingApp.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using BookingApp.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<Accommodation>("AccOData");
    builder.EntitySet<AccommodationType>("AccommodationTypes"); 
    builder.EntitySet<Comment>("Comments"); 
    builder.EntitySet<AppUser>("AppUsers"); 
    builder.EntitySet<Place>("Places"); 
    builder.EntitySet<Room>("Rooms"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class AccODataController : ODataController
    {
        private BAContext db = new BAContext();

        // GET: odata/AccOData
        [EnableQuery]
    
        public IQueryable<Accommodation> GetAccOData()
        {
            return db.Accommodations;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AccommodationExists(int key)
        {
            return db.Accommodations.Count(e => e.Id == key) > 0;
        }
    }
}
