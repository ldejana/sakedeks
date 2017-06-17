using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookingApp.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public String Name { get; set; }

        [Required]
        [MaxLength(20)]
        public String LastName { get; set; }

        public bool IsBanned { get; set; }

        public IList<Comment> Comments { get; set; }

        public IList<RoomReservation> RoomReservations { get; set; }

        public IList<Accommodation> Accommodations { get; set; }
    }
}