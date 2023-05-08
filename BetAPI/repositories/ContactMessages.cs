using BetAPI.Controllers;
using BetAPI.Data;
using BetAPI.repositories.Contracts;
using Domain;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;

namespace BetAPI.repositories
{
    public class ContactMessages : IMeassage
    {
        private readonly IConfiguration _configuration;
        private readonly Context _db;
        private readonly ILogger<ContactMessages> _logger;

        public ContactMessages(IConfiguration configuration, Context db, ILogger<ContactMessages> logger )
        {
            _configuration = configuration;
            _db = db;
            _logger = logger;
        }

       public List<Contact> GetMessages()
        {
            var messages=  _db.messages.ToList();
            return messages;
        }

       
        public async Task SendMessage(Contact contact)
        {
            try
            {
                await _db.messages.AddAsync(contact);
                await _db.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending message");
                throw; // re-throw the exception to be handled by the calling method
            }
            

        }
    }
}
