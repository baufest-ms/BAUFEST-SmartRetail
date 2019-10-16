using BF.Retail.SmartRetail.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IProductManager
    {
        IList<Product> GetAll();

        Product GetById(int id);

        Product GetByCode(string code);

        Task AddAsync(Product product);

        Task UpdateAsync(Product product);

    }
}
