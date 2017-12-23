using System;

namespace ScavengerCity.Models
{
    public class HuntInstance
    {
        public int HuntInstanceID { get; set; }

        public string ShareID { get; set; }

        public string UserID { get; set; }

        public int HuntID { get; set; }

        public HuntStatus Status { get; set; }

        public int Progress { get; set; }

        public int QuestionCount { get; set; }

        public int Skipped { get; set; }

        public int Penalties { get; set; }

        public int PurchaseID { get; set; }

        public int? CurrentQuestionInstanceID { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public DateTime? AdjustedEndTime { get; set; }

        public QuestionInstance CurrentQuestionInstance { get; set; }

        public Hunt Hunt { get; set; }

        public Purchase Purchase { get; set; }
    }
}