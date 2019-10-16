using BF.Retail.SmartRetail.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IPersonManager
    {
        IList<Person> GetAll();

        IList<Person> GetAllByGroupId(int groupId);

        Person GetById(int id);

        Task AddAsync(Person person);

        Task UpdateAsync(Person person);

    }
}
