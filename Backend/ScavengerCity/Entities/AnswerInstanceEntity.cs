using System;
using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class AnswerInstanceEntity
    {
        [Key]
        public int AnswerInstanceID { get; set; }

        [Required]
        public int QuestionInstanceID { get; set; }

        public string Text { get; set; }

        [Required]
        public bool IsCorrect { get; set; }

        [Required]
        public bool IsSkipped { get; set; }
    }
}
