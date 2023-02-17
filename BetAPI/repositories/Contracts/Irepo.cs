using Domain;
using Microsoft.AspNetCore.Mvc;

namespace BetAPI.repositories.Contracts
{
    public interface Irepo
    {
        List<BetEntity> GetAll_July_4();
        List<BetEntity> GetAll_July_11();

        List<BetEntity> GetAll_July_18();

        List<BetEntity> GetAll_July_25();
       Task saveBetEntity_4(List<BetEntity> betList);
      




    }
}
