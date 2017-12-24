using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using ScavengerCity.Models;

namespace ScavengerCity.SignalR
{
    public class HuntHub : Hub
    {
        public Task JoinHunt(string huntShareID)
        {
            if (huntShareID == null)
            {
                return Task.CompletedTask;
            }

            return Groups.AddAsync(Context.ConnectionId, huntShareID);
        }
    }
}
