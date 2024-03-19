using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication3.Models
{
    public class Hydrograph
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
        public string CatchmentName { get; set; }

        [MaxLength(48)]
        public string StormName { get; set; }

        public DateTime? DateInserted { get; set; }
    }
}