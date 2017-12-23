using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScavengerCity.Models;
using ScavengerCity.Services;

namespace ScavengerCity.Controllers
{
    [Route("Hunt-Instances")]
    public class HuntInstancesController : Controller
    {
        private readonly HuntInstanceService _huntInstanceService;

        public HuntInstancesController(HuntInstanceService huntInstanceService)
        {
            _huntInstanceService = huntInstanceService;
        }

        [Authorize]
        [HttpGet]
        public IEnumerable<HuntInstance> Get() => _huntInstanceService.Get();

        [Authorize]
        [HttpGet("{id}")]
        public HuntInstance Get(int id) => _huntInstanceService.Get(id);

        [Authorize]
        [HttpPost("{id}/skip")]
        public AnswerInstance Skip(int id) => _huntInstanceService.Skip(id);

        [Authorize]
        [HttpPost("{id}/submit")]
        public AnswerInstance SubmitAnswer(int id, [FromBody] AnswerSubmission model) => _huntInstanceService.SubmitAnswer(id, model);

        [Authorize]
        [HttpPost("{id}/hint")]
        public Hint Hint(int id) => _huntInstanceService.Hint(id);

        [Authorize]
        [HttpPost("{id}/start")]
        public HuntInstance Start(int id) => _huntInstanceService.Start(id);

        [HttpGet("shared/{id}")]
        public HuntInstance GetShared(string id) => _huntInstanceService.GetShared(id);

        [HttpPost("shared/{id}/join")]
        public void Join(string id) => _huntInstanceService.Join(id);
    }
}
