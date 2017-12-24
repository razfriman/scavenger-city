using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ScavengerCity.Entities;
using ScavengerCity.Helpers;
using ScavengerCity.Models;
using Stripe;

namespace ScavengerCity.Services
{
    public class HuntService
    {
        private readonly ClaimsPrincipal _user;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ScavengerDbContext _dbContext;

        public HuntService(ClaimsPrincipal user, UserManager<IdentityUser> userManager, ScavengerDbContext dbContext)
        {
            _user = user;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        public IEnumerable<Hunt> Get()
        {
            return _dbContext
                .Hunts
                .ToArray()
                .Select(x => Mapper.Map<Hunt>(x));
        }

        public Hunt Get(int id)
        {
            var hunt = _dbContext
                .Hunts
                .FirstOrDefault(x => x.HuntID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt with ID={id}");
            }

            return Mapper.Map<Hunt>(hunt);
        }

        public HuntInstance Purchase(int id, PurchaseRequest request)
        {
            var hunt = _dbContext.Hunts
                                .Include(x => x.Questions)
                                .FirstOrDefault(x => x.HuntID == id);

            if (hunt == null)
            {
                throw new RecordNotFoundException($"Cannot find Hunt with ID={id}");
            }

            var charge = Charge(request, hunt.Price, $"ScavengerCity Purchase - {hunt.Name}");

            if (!charge.Paid)
            {
                throw new PaymentAuthorizationException(charge.FailureMessage);
            }

            var instance = new HuntInstanceEntity
            {
                HuntID = id,
                Hunt = hunt,
                Status = HuntStatus.Available,
                UserID = _userManager.GetUserId(_user),
                Purchase = new PurchaseEntity
                {
                    Price = charge.Amount,
                    Date = DateTime.Now,
                    ChargeID = charge.Id
                }
            };

            CreateQuestionInstances(instance);

            _dbContext.HuntInstances.Add(instance);
            _dbContext.SaveChanges();

            instance.ShareID = GenerateShareID(instance.HuntInstanceID);
            _dbContext.SaveChanges();

            return Mapper.Map<HuntInstance>(instance);
        }

        private string GenerateShareID(int huntInstanceID) => $"{huntInstanceID}:{Guid.NewGuid()}";

        private StripeCharge Charge(PurchaseRequest request, int price, string description)
        {
            var customers = new StripeCustomerService();
            var charges = new StripeChargeService();

            var customer = customers.Create(new StripeCustomerCreateOptions
            {
                Email = request.Email,
                SourceToken = request.Token
            });

            var charge = charges.Create(new StripeChargeCreateOptions
            {
                Amount = price,
                Description = description,
                Currency = "usd",
                CustomerId = customer.Id
            });

            return charge;
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
