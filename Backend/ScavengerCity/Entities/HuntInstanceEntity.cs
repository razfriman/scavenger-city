using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using ScavengerCity.Models;

namespace ScavengerCity.Entities
{
    public class HuntInstanceEntity
    {
        public HuntInstanceEntity()
        {
            Questions = new List<QuestionInstanceEntity>();
        }

        [Key]
        public int HuntInstanceID { get; set; }

        [Required]
        public string ShareID { get; set; }

        [Required]
        public string UserID { get; set; }

        [Required]
        public int HuntID { get; set; }

        [Required]
        public HuntStatus Status { get; set; }

        [Required]
        public int Progress { get; set; }

        [Required]
        public int QuestionCount { get; set; }

        [Required]
        public int Skipped { get; set; }

        [Required]
        public int Penalties { get; set; }

        [Required]
        public int PurchaseID { get; set; }

        public int? CurrentQuestionInstanceID { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }

        public DateTime? AdjustedEndTime { get; set; }

        public QuestionInstanceEntity CurrentQuestionInstance { get; set; }

        public HuntEntity Hunt { get; set; }

        public PurchaseEntity Purchase { get; set; }

        public ICollection<QuestionInstanceEntity> Questions { get; set; }
    }
}
