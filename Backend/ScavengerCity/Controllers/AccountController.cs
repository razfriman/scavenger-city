using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ScavengerCity.Models;
using ScavengerCity.Services;

namespace ScavengerCity.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;

        public AccountController(
            AccountService accountService
            )
        {
            _accountService = accountService;
        }

        [HttpPost]
        public async Task<object> Login([FromBody] LoginDto model) => await _accountService.Login(model);

        [HttpPost]
        public async Task<string> Register([FromBody] RegisterDto model) => await _accountService.Register(model);
    }
}