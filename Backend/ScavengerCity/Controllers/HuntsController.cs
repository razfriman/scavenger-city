using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ScavengerCity.Models;
using ScavengerCity.Services;

namespace ScavengerCity.Controllers
{
    [Route("[controller]")]
    public class HuntsController : Controller
    {
        private readonly HuntService _huntService;

        public HuntsController(
            HuntService huntService
            )
        {
            _huntService = huntService;
        }

        [HttpGet]
        public IEnumerable<Hunt> Get()
        {
            return _huntService.Get();
        }

        [HttpGet("{id}")]
        public Hunt Get(int id)
        {
            return _huntService.Get(id);
        }

        [HttpPost("{id}/purchase")]
        public HuntInstance Purchase(int id, [FromBody] PurchaseRequest request)
        {
            return _huntService.Purchase(id, request);
        }
    }
}
