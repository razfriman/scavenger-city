using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Models
{
    public class AnswerSubmission
    {
        [Required]
        public string Text { get; set; }
    }
}
