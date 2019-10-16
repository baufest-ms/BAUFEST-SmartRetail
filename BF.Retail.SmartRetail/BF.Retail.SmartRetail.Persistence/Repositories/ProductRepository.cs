using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Entities;
using System.Linq;

namespace BF.Retail.SmartRetail.Persistence.Repositories
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public Product GetByCode(string code)
        {
            return GetAll().Where(product => product.Code == code).FirstOrDefault();
        }

        public bool Exists(string code, int id = 0)
        {
            return GetAll().Where(product => product.Id != id && product.Code == code).Any();
        }

    }
}
