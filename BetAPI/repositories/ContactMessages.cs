using BetAPI.Controllers;
using BetAPI.Data;
using BetAPI.repositories.Contracts;
using Domain;
using SendGrid;
using SendGrid.Helpers.Mail;


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

       
        public async Task<string> SendMessage(Contact contact)
        {
            try
            {



                //creating APIKey
                var apiKey = "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";


                var client = new SendGridClient(apiKey);
                
                var from = new EmailAddress(contact.Email);
                
                var to = new EmailAddress("solin.h96@hotmail.com");
               
                var subject = contact.Subject;

                //plain text of the email message
                var plainTextContent = contact.message;
               
                //text designing
                var htmlContent = contact.message;
              
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
               
               var mes= await client.SendEmailAsync(msg);
                if (mes != null)
                {
                    return "the mail was sent";
                }

                await _db.messages.AddAsync(contact);
                await _db.SaveChangesAsync();
                return "the mail was not sent";
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error sending message");
                throw; // re-throw the exception to be handled by the calling method
            }
            

        }
    }
}
