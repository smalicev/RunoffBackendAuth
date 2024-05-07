using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class Storm
    {
        [Key]
        public int Id { get; set; }

        [MaxLength]
        public string Time { get; set; }

        [MaxLength]
        public string Value { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public string UserID { get; set; }

        [MaxLength(48)]
        public string StormDescription { get; set; }

        [MaxLength(30)]
        public string DateInserted { get; set; }
    }
}
