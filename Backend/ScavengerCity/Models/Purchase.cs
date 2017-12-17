using System;

namespace ScavengerCity.Models
{
    public class Purchase
    {
        public int PurchaseID { get; set; }

        public int Price { get; set; }

        public DateTime Date { get; set; }

        public string ChargeID { get; set; }
    }
}
