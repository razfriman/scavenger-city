using System;
using System.Net;
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

        public ExceptionFilter(ILoggerFactory logger, RavenClient ravenClient, string release)
        {
            if (logger == null)
            {
                throw new ArgumentNullException(nameof(logger));
            }

            ravenClient.Release = release;

            _logger = logger.CreateLogger(nameof(ExceptionFilter));
            _ravenClient = ravenClient;
        }

        public void OnException(ExceptionContext context)
        {
            _ravenClient.CaptureAsync(new SentryEvent(context.Exception));
            _logger.LogError("Exception", context.Exception);

            var response = new ApiResponse
            {
                Data = context.Exception.Message,
                StatusCode = GetStatusCode(context)
            };

            context.Result = new ObjectResult(response)
            {
                StatusCode = (int)response.StatusCode,
                DeclaredType = typeof(ApiResponse)
            };
        }

        private static HttpStatusCode GetStatusCode(ExceptionContext context)
        {
            switch (context.Exception)
            {
                case RecordNotFoundException e:
                    return HttpStatusCode.NotFound;
                case InvalidActionException e:
                    return HttpStatusCode.ExpectationFailed;
                case AuthorizationException e:
                    return HttpStatusCode.ExpectationFailed;
                case PaymentAuthorizationException e:
                    return HttpStatusCode.ExpectationFailed;
                default:
                    return HttpStatusCode.InternalServerError;
            }
        }
    }
}