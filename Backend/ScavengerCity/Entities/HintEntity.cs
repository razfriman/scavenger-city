using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class HintEntity
    {
        [Key]
        public int HintID { get; set; }

        [Required]
        public string Text { get; set; }
    }
}
