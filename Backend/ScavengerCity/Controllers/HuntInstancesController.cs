using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ScavengerCity.Models;
using ScavengerCity.Services;
using ScavengerCity.SignalR;

namespace ScavengerCity.Controllers
{
    [Route("Hunt-Instances")]
    [Authorize]
    public class HuntInstancesController : Controller
    {
        private readonly HuntInstanceService _huntInstanceService;
        private readonly HuntHub _huntHub;

        public HuntInstancesController(HuntInstanceService huntInstanceService, HuntHub huntHub)
        {
            _huntInstanceService = huntInstanceService;
            _huntHub = huntHub;
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
            var result = _huntInstanceService.Skip(id);
            _huntHub.UpdateHunt(id);
            return result;
        }

        [HttpPost("{id}/submit")]
        public AnswerInstance SubmitAnswer(int id, [FromBody] AnswerSubmission model)
        {
            var result = _huntInstanceService.SubmitAnswer(id, model);
            _huntHub.UpdateHunt(id);
            return result;
        }

        [HttpPost("{id}/hint")]
        public Hint Hint(int id)
        {
            var result = _huntInstanceService.Hint(id);
            _huntHub.UpdateHunt(id);
            return result;
        }

        [HttpPost("{id}/start")]
        public HuntInstance Start(int id)
        {
            var result = _huntInstanceService.Start(id);
            _huntHub.UpdateHunt(id);
            return result;
        }

        [HttpPost("{id}/join")]
        public void Join(int id)
        {
            _huntHub.JoinHunt(id);
        }
    }
}
