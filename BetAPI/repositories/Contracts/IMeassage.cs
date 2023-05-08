using Domain;

namespace BetAPI.repositories.Contracts
{
    public interface IMeassage
    {
        Task<string> SendMessage(Contact contact);
        List<Contact> GetMessages();
    }
}
