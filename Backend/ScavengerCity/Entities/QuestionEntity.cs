using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class QuestionEntity
    {
        [Key]
        public int QuestionID { get; set; }

        [Required]
        public int AnswerID { get; set; }

        [Required]
        public int SequenceNumber { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public int HuntID { get; set; }

        [Required]
        public string Fact { get; set; }

        [Required]
        public int HintID { get; set; }

        public AnswerEntity Answer { get; set; }

        public HintEntity Hint { get; set; }
    }
}
