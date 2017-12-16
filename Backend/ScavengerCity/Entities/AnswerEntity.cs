using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class AnswerEntity
    {
        [Key]
        public int AnswerID { get; set; }

        [Required]
        public string Text { get; set; }
    }
}
