using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

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

        public Task UpdateHunt(string huntShareID)
        {
            if (huntShareID == null)
            {
                return Task.CompletedTask;
            }

            return Clients.Group(huntShareID).InvokeAsync("HuntUpdated");
        }
    }
}
