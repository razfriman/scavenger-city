﻿using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScavengerCity.Models;
using ScavengerCity.Services;

namespace ScavengerCity.Controllers
{
    [Route("[controller]")]
    public class HuntsController : Controller
    {
        private readonly HuntService _huntService;

        public HuntsController(HuntService huntService)
        {
            _huntService = huntService;
        }

        [HttpGet]
        public IEnumerable<Hunt> Get() => _huntService.Get();

        [HttpGet("{id}")]
        public Hunt Get(int id) => _huntService.Get(id);

        [HttpPost("{id}/purchase")]
        [Authorize]
        public HuntInstance Purchase(int id, [FromBody] PurchaseRequest request) => _huntService.Purchase(id, request);
    }
}
