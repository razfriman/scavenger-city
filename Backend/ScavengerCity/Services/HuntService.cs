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

            var charge = Charge(request);

            var instance = new HuntInstanceEntity
            {
                HuntID = hunt.HuntID,
                Status = HuntStatus.Available,
                UserID = _userManager.GetUserId(_user),
                Purchase = new PurchaseEntity
                {
                    Price = 0,
                    Date = DateTime.Now
                }
            };

            _dbContext.HuntInstances.Add(instance);
            _dbContext.SaveChanges();

            return Mapper.Map<HuntInstance>(instance);
        }

        private StripeCharge Charge(PurchaseRequest request)
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
                Amount = 500,
                Description = "Sample Charge",
                Currency = "usd",
                CustomerId = customer.Id
            });

            return charge;
        }
    }
}
