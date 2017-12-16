using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Models
{
    public class Question
    {
        public int QuestionID { get; set; }

        public int AnswerID { get; set; }

        public int SequenceNumber { get; set; }

        public string Text { get; set; }

        public int HuntID { get; set; }

        public string Fact { get; set; }

        public int HintID { get; set; }

        public Answer Answer { get; set; }

        public Hint Hint { get; set; }
    }
}
