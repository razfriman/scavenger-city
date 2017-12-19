using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using SharpRaven.Core;
using SharpRaven.Core.Data;

namespace ScavengerCity.Helpers
{
    public class ExceptionFilter : IExceptionFilter
    {
        private readonly ILogger _logger;
        private readonly RavenClient _ravenClient;

        public ExceptionFilter(ILoggerFactory logger, RavenClient ravenClient)
        {
            if (logger == null)
            {
                throw new ArgumentNullException(nameof(logger));
            }

            _logger = logger.CreateLogger(nameof(ExceptionFilter));
            _ravenClient = ravenClient;
        }

        public void OnException(ExceptionContext context)
        {
            var response = new ApiResponse
            {
                Data = context.Exception
            };

            _ravenClient.CaptureAsync(new SentryEvent(context.Exception));

            switch (context.Exception)
            {
                case RecordNotFoundException e:
                    response.StatusCode = System.Net.HttpStatusCode.NotFound;
                    break;
                case InvalidActionException e:
                    response.StatusCode = System.Net.HttpStatusCode.ExpectationFailed;
                    break;
                case AuthorizationException e:
                    response.StatusCode = System.Net.HttpStatusCode.ExpectationFailed;
                    break;
                case PaymentAuthorizationException e:
                    response.StatusCode = System.Net.HttpStatusCode.ExpectationFailed;
                    break;
                default:
                    response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                    break;
            }

            _logger.LogError("Exception", context.Exception);

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)response.StatusCode,
                DeclaredType = typeof(ApiResponse)
            };
        }
    }
}