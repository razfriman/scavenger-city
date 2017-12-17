using System.Collections.Generic;
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

        [HttpGet]
        public IEnumerable<HuntInstance> Get()
        {
            return _huntInstanceService.Get();
        }

        [HttpGet("{id}")]
        public HuntInstance Get(int id)
        {
            return _huntInstanceService.Get(id);
        }

        [HttpPost("{id}/skip")]
        public AnswerInstance Skip(int id)
        {
            return _huntInstanceService.Skip(id);
        }

        [HttpPost("{id}/submit")]
        public AnswerInstance SubmitAnswer(int id, [FromBody] AnswerSubmission model)
        {
            return _huntInstanceService.SubmitAnswer(id, model);
        }

        [HttpPost("{id}/hint")]
        public Hint Hint(int id)
        {
            return _huntInstanceService.Hint(id);
        }

        [HttpPost("{id}/start")]
        public HuntInstance Start(int id)
        {
            return _huntInstanceService.Start(id);
        }
    }
}
