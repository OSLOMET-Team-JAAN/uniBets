using Domain;

namespace BetAPI.repositories.Contracts
{
    public interface IMeassage
    {
        Task SendMessage(Contact contact);
        List<Contact> GetMessages();
    }
}
