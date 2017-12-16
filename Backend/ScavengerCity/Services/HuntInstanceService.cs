﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ScavengerCity.Entities;
using ScavengerCity.Helpers;
using ScavengerCity.Models;

namespace ScavengerCity.Services
{
    public class HuntInstanceService
    {
        private readonly ClaimsPrincipal _user;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ScavengerDbContext _dbContext;

        public HuntInstanceService(ClaimsPrincipal user, UserManager<IdentityUser> userManager, ScavengerDbContext dbContext)
        {
            _user = user;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public IEnumerable<HuntInstance> Get()
        {
            return _dbContext
                .HuntInstances
                .Where(x => x.UserID == _userManager.GetUserId(_user))
                .ToArray()
                .Select(x => Mapper.Map<HuntInstance>(x));
        }

        public HuntInstance Get(int id)
        {
            var hunt = _dbContext
                .HuntInstances
                .Include(x => x.CurrentQuestionInstance.Answers)
                .Include(x => x.CurrentQuestionInstance.Question)
                .Where(x => x.UserID == _userManager.GetUserId(_user))
                .FirstOrDefault(x => x.HuntID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt Instance with ID={id}");
            }

            if (hunt.CurrentQuestionInstance?.IsHintUsed ?? false)
            {
                _dbContext.Hints
                         .Where(x => x.HintID == hunt.CurrentQuestionInstance.Question.HintID)
                         .ToArray();
            }

            return Mapper.Map<HuntInstance>(hunt);
        }

        public AnswerInstance Skip(int id)
        {
            var hunt = _dbContext
                    .HuntInstances
                    .Include(x => x.Questions)
                    .Include(x => x.CurrentQuestionInstance.Question.Answer)
                    .Where(x => x.UserID == _userManager.GetUserId(_user))
                    .FirstOrDefault(x => x.HuntInstanceID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt Instance with ID={id}");
            }

            if (hunt.Status != HuntStatus.InProgress)
            {
                throw new InvalidActionException("Hunt must be in progress");
            }

            var question = hunt.CurrentQuestionInstance;
            var submission = new AnswerInstanceEntity
            {
                Text = null,
                QuestionInstanceID = question.QuestionInstanceID,
                IsSkipped = true
            };

            question.Answers.Add(submission);
            hunt.Penalties += 10;
            hunt.Skipped++;
            AdvanceNextQuestion(hunt);

            _dbContext.SaveChanges();

            return Mapper.Map<AnswerInstance>(submission);
        }

        public AnswerInstance SubmitAnswer(int id, AnswerSubmission model)
        {
            var hunt = _dbContext
                .HuntInstances
                .Include(x => x.Questions)
                .Include(x => x.CurrentQuestionInstance.Question.Answer)
                .Where(x => x.UserID == _userManager.GetUserId(_user))
                .FirstOrDefault(x => x.HuntInstanceID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt Instance with ID={id}");
            }

            if (hunt.Status != HuntStatus.InProgress)
            {
                throw new InvalidActionException("Hunt must be in progress");
            }

            var question = hunt.CurrentQuestionInstance;
            var submission = new AnswerInstanceEntity
            {
                Text = model.Text,
                QuestionInstanceID = question.QuestionInstanceID,
                IsCorrect = CheckAnswer(model.Text, question.Question.Answer.Text)
            };

            question.Answers.Add(submission);

            if (submission.IsCorrect)
            {
                AdvanceNextQuestion(hunt);
            }
            else
            {
                hunt.Penalties += 10;
            }

            _dbContext.SaveChanges();

            return Mapper.Map<AnswerInstance>(submission);
        }

        public Hint Hint(int id)
        {
            var hunt = _dbContext
                .HuntInstances
                .Include(x => x.CurrentQuestionInstance.Question.Hint)
                .Where(x => x.UserID == _userManager.GetUserId(_user))
                .FirstOrDefault(x => x.HuntInstanceID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt Instance with ID={id}");
            }

            if (hunt.Status != HuntStatus.InProgress)
            {
                throw new InvalidActionException("Hunt must be in progress");
            }

            var hint = hunt.CurrentQuestionInstance.Question.Hint;

            if (!hunt.CurrentQuestionInstance.IsHintUsed)
            {
                hunt.CurrentQuestionInstance.IsHintUsed = true;
                hunt.Penalties += 10;
                _dbContext.SaveChanges();
            }

            return Mapper.Map<Hint>(hint);
        }

        public HuntInstance Start(int id)
        {
            var hunt = _dbContext
                    .HuntInstances
                    .Include(x => x.Hunt.Questions)
                    .Where(x => x.UserID == _userManager.GetUserId(_user))
                    .FirstOrDefault(x => x.HuntInstanceID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt Instance with ID={id}");
            }

            if (hunt.Status != HuntStatus.Available)
            {
                throw new InvalidActionException("Hunt must be available");
            }

            hunt.Status = HuntStatus.InProgress;
            hunt.StartTime = DateTime.Now;
            CreateQuestionInstances(hunt);
            AdvanceNextQuestion(hunt);
            _dbContext.SaveChanges();

            return Mapper.Map<HuntInstance>(hunt);
        }

        private static void AdvanceNextQuestion(HuntInstanceEntity hunt)
        {
            if (hunt.Progress < hunt.QuestionCount)
            {
                hunt.Progress++;
                hunt.CurrentQuestionInstance = hunt.Questions
                    .FirstOrDefault(x => x.SequenceNumber == hunt.Progress);
            }
            else
            {
                hunt.Status = HuntStatus.Completed;
                hunt.EndTime = DateTime.Now;
                hunt.AdjustedEndTime = hunt.EndTime.Value.AddSeconds(hunt.Penalties);
                hunt.CurrentQuestionInstance = null;
            }
        }

        private bool CheckAnswer(string userAnswer, string realAnswer)
        {
            return userAnswer?.Trim()?.Equals(realAnswer.Trim(), StringComparison.InvariantCultureIgnoreCase) ?? false;
        }

        private static void CreateQuestionInstances(HuntInstanceEntity hunt)
        {
            foreach (var item in hunt.Hunt.Questions)
            {
                var questionInstance = new QuestionInstanceEntity
                {
                    HuntInstanceID = hunt.HuntInstanceID,
                    QuestionID = item.QuestionID,
                    SequenceNumber = item.SequenceNumber
                };

                hunt.Questions.Add(questionInstance);
            }

            hunt.QuestionCount = hunt.Questions.Count;
        }
    }
}