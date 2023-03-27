using Domain;

namespace BetAPI.repositories.Contracts;

public interface IRepo
{
    Task SaveTable(List<BetEntity> betList);
    List<BetEntity> GetAll();
   

}