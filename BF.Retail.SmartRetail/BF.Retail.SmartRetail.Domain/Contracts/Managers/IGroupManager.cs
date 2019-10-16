using BF.Retail.SmartRetail.Domain.DTOs;
using BF.Retail.SmartRetail.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IGroupManager
    {
        IList<Group> GetAll();

        Group GetById(int id);

        Task AddAsync(Group group);

        Task UpdateAsync(Group group);

        Task<List<Candidate>> SearchCandidatesAsync(int id, byte[] image);
    }
}
