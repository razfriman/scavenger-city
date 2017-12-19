using System;
namespace ScavengerCity.Helpers
{
    public class AuthorizationException : Exception
    {
        public AuthorizationException()
        {

        }

        public AuthorizationException(string message) : base(message)
        {

        }
    }
}
