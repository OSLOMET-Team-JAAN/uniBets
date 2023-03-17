using Domain;

namespace BetAPI.repositories.Contracts;

public interface IRepo
{
    Task SaveTable(List<BetEntity> betList);
    List<BetEntity> GetAll();
    List<BetEntity> GetAll_July_4();
    List<BetEntity> GetAll_July_11(); 
    List<BetEntity> GetAll_July_18();
    List<BetEntity> GetAll_July_25();

}