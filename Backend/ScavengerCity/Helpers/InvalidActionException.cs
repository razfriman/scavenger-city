﻿using System;
namespace ScavengerCity.Helpers
{
    public class InvalidActionException : Exception
    {
        public InvalidActionException()
        {

        }

        public InvalidActionException(string message) : base(message)
        {

        }
    }
}
