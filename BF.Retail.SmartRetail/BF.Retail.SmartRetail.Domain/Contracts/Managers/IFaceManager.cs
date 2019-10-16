using BF.Retail.SmartRetail.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IFaceManager
    {
        IList<Face> GetAll();

        IList<Face> GetAllByPersonId(int personId);

        IList<Face> GetAllByGroupId(int groupId);

        Face GetById(int id);

        Task AddAsync(Face face);

    }
}
