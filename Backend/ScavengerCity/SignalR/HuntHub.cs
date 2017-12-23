using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ScavengerCity.SignalR
{
    public class HuntHub : Hub
    {
        public Task JoinHunt(string huntShareID)
        {
            return Groups.AddAsync(Context.ConnectionId, huntShareID);
        }
        public Task UpdateHunt(string huntShareID)
        {
            return Clients.Group(huntShareID).InvokeAsync("HuntUpdated");
        }
    }
}
