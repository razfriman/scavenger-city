using System;
namespace ScavengerCity.Helpers
{
    public class PaymentAuthorizationException : Exception
    {
        public PaymentAuthorizationException()
        {

        }

        public PaymentAuthorizationException(string message) : base(message)
        {

        }
    }
}
