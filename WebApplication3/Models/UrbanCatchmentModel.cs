using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
    public class UrbanCatchment
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(48)]
        public string AreaHectares { get; set; }

        [Required, MaxLength(6)]
        public string ImperviousPercent { get; set; }

        [Required, MaxLength(6)]
        public string SlopePercent { get; set; }

        [Required, MaxLength(3)]
        public string CurveNumber { get; set; }

        [Required, MaxLength(48)]
        public string FlowLength { get; set; }

        [Required(ErrorMessage = "User ID is required")]
        public string UserID { get; set; }

        [MaxLength(48)]
        public string CatchmentDescription { get; set; }

        [MaxLength(30)]
        public string DateInserted { get; set; }
    }
}
