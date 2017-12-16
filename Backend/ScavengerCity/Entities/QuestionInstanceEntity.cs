using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Entities
{
    public class QuestionInstanceEntity
    {
        public QuestionInstanceEntity()
        {
            Answers = new List<AnswerInstanceEntity>();
        }

        [Key]
        public int QuestionInstanceID { get; set; }

        [Required]
        public int HuntInstanceID { get; set; }

        [Required]
        public int QuestionID { get; set; }

        [Required]
        public bool IsHintUsed { get; set; }

        [Required]
        public int SequenceNumber { get; set; }

        public QuestionEntity Question { get; set; }

        public ICollection<AnswerInstanceEntity> Answers { get; set; }
    }
}
