using System;
using BF.Retail.SmartRetail.Domain.Entities;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        Product GetByCode(string code);

        bool Exists(string code, int id = 0);

    }
}
