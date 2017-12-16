using System;
using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class PurchaseEntity
    {
        [Key]
        public int PurchaseID { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
