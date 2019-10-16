using BF.Retail.SmartRetail.Domain.Entities;
using System;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IPersonRepository : IBaseRepository<Person>
    {
        Person GetByAPIPersonId(Guid apiPersonId);

        bool Exists(string email, int id = 0);

    }
}
