using System.Net;

namespace ScavengerCity.Helpers
{
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }

        public object Data { get; set; }
    }
}
