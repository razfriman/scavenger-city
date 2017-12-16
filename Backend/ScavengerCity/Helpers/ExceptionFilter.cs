using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace ScavengerCity.Helpers
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ILogger _logger;

        public ExceptionFilter(ILoggerFactory logger)
        {
            if (logger == null)
            {
                throw new ArgumentNullException(nameof(logger));
            }

            _logger = logger.CreateLogger(nameof(ExceptionFilter));
        }

        public void OnException(ExceptionContext context)
        {
            var response = new ApiResponse();

            switch (context.Exception)
            {
                case RecordNotFoundException e:
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    response.Message = e.Message;
                    _logger.LogInformation(nameof(RecordNotFoundException), e);
                    break;
                case InvalidActionException e:
                    response.StatusCode = System.Net.HttpStatusCode.ExpectationFailed;
                    response.Message = e.Message;
                    _logger.LogInformation(nameof(InvalidActionException), e);

                    break;
                default:
                    response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                    response.Message = context.Exception.Message;
                    response.Data = context.Exception;
                    _logger.LogError("Exception", context.Exception);
                    break;
            }

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)response.StatusCode,
                DeclaredType = typeof(ApiResponse)
            };
        }
    }
}