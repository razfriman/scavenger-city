using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ScavengerCity.Helpers
{
    public class ResultWrapperFilter : IResultFilter
    {
        public void OnResultExecuting(ResultExecutingContext context)
        {
            if (!(context.ActionDescriptor is ControllerActionDescriptor))
            {
                return;
            }

            var objectResult = context.Result as ObjectResult;
            if (objectResult == null)
            {
                return;
            }

            if (!(objectResult.Value is ApiResponse))
            {
                objectResult.Value = new ApiResponse
                {
                    StatusCode = System.Net.HttpStatusCode.OK,
                    Data = objectResult.Value
                };
                objectResult.DeclaredType = typeof(ApiResponse);
            }
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
        }
    }
}
