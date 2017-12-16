using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ScavengerCity.Models
{
    public class QuestionInstance
    {
        public QuestionInstance()
        {
            Answers = new List<AnswerInstance>();
        }

        public int QuestionInstanceID { get; set; }

        public int HuntInstanceID { get; set; }

        public int QuestionID { get; set; }

        public bool IsHintUsed { get; set; }

        public int SequenceNumber { get; set; }

        public Question Question { get; set; }

        public List<AnswerInstance> Answers { get; set; }
    }
}
