using System;
using System.Linq;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ScavengerCity.Entities;

namespace ScavengerCity
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);

            SeedDatabase(host);

            host.Run();
        }

        private static void SeedDatabase(IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ScavengerDbContext>();
                    CreateSampleData(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
        }

        private static void CreateSampleData(ScavengerDbContext dbContext)
        {
            if (dbContext.Hunts.Count() > 0)
            {
                return;
            }

            var hunt = new HuntEntity()
            {
                City = "Sydney",
                Country = "Australia",
                Description = "Walk around Sydney",
                Distance = 3.5f,
                Name = "Sydney Walkabout"
            };

            AddQuestion(dbContext, hunt, "question 1", "fact 1", "hint 1", "answer 1", 1);
            AddQuestion(dbContext, hunt, "question 2", "fact 2", "hint 2", "answer 2", 2);
            AddQuestion(dbContext, hunt, "question 3", "fact 3", "hint 3", "answer 3", 3);
            AddQuestion(dbContext, hunt, "question 4", "fact 4", "hint 4", "answer 4", 4);

            dbContext.Hunts.Add(hunt);
            dbContext.SaveChanges();
        }

        private static void AddQuestion(ScavengerDbContext dbContext, HuntEntity hunt, string questionStr, string factStr, string hintStr, string answerStr, int sequence)
        {
            var answer = new AnswerEntity
            {
                Text = answerStr
            };

            var hint = new HintEntity
            {
                Text = hintStr
            };

            var question = new QuestionEntity
            {
                Fact = factStr,
                Hint = hint,
                SequenceNumber = sequence,
                Text = questionStr,
                Answer = answer
            };

            hunt.Questions.Add(question);

            dbContext.Hints.Add(hint);
            dbContext.Answers.Add(answer);
            dbContext.Questions.Add(question);
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}