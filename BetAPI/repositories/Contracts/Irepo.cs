using Domain;

namespace BetAPI.repositories.Contracts
{
    public interface Irepo
    {
        List<BetEntity> GetAll_July_4();
      /*  Task<BetEntity> Geten(int Id);
        Task<BetEntity> AddBet(BetEntity bet);
        Task<BetEntity> UpdateBet(int Id, BetEntity bet);
        Task<BetEntity> Delete(int Id);*/
    }
}
