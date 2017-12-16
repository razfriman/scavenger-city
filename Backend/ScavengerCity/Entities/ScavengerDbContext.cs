using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ScavengerCity.Entities
{
    public class ScavengerDbContext : IdentityDbContext
    {
        public ScavengerDbContext(DbContextOptions<ScavengerDbContext> options) : base(options)
        {
        }

        public DbSet<HuntEntity> Hunts { get; set; }
        public DbSet<QuestionEntity> Questions { get; set; }
        public DbSet<QuestionInstanceEntity> QuestionInstances { get; set; }
        public DbSet<AnswerEntity> Answers { get; set; }
        public DbSet<AnswerInstanceEntity> AnswerInstances { get; set; }
        public DbSet<HintEntity> Hints { get; set; }
        public DbSet<HuntInstanceEntity> HuntInstances { get; set; }
        public DbSet<PurchaseEntity> Purchases { get; set; }
    }
}