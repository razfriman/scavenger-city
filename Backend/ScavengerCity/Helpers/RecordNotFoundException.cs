using System;
namespace ScavengerCity.Helpers
{
    public class RecordNotFoundException : Exception
    {
        public RecordNotFoundException()
        {

        }

        public RecordNotFoundException(string message) : base(message)
        {

        }
    }
}
