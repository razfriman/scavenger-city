namespace ScavengerCity.Models
{
    public class AnswerInstance
    {
        public int AnswerInstanceID { get; set; }

        public int QuestionInstanceID { get; set; }

        public string Text { get; set; }

        public bool IsCorrect { get; set; }

        public bool IsSkipped { get; set; }
    }
}
