using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class HuntEntity
    {
        public HuntEntity()
        {
            Questions = new List<QuestionEntity>();
        }

        [Key]
        public int HuntID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public float Distance { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public int Price { get; set; }

        public ICollection<QuestionEntity> Questions { get; set; }
    }
}
