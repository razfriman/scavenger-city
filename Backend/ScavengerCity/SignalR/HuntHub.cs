using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace ScavengerCity.SignalR
{
    public class HuntHub : Hub
    {
        public Task JoinHunt(int huntInstanceID)
        {
            return Groups.AddAsync(Context.ConnectionId, huntInstanceID.ToString());
        }
        public Task UpdateHunt(int huntInstanceID)
        {
            return Clients.Group(huntInstanceID.ToString()).InvokeAsync("HuntInstanceUpdated");
        }
    }
}
