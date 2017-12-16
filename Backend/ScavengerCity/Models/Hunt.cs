using System.Collections.Generic;

namespace ScavengerCity.Models
{
    public class Hunt
    {
        public Hunt()
        {
            Questions = new List<Question>();
        }

        public int HuntID { get; set; }

        public string Name { get; set; }

        public float Distance { get; set; }

        public string Description { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public List<Question> Questions { get; set; }
    }
}
