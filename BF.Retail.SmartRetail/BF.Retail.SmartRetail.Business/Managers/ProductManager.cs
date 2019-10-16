using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Entities;
using BF.Retail.SmartRetail.Domain.Exceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Business
{
    public class ProductManager : BaseManager, IProductManager
    {
        private readonly IProductRepository productRepository;

        public ProductManager(IProductRepository productRepository)
        {
            this.productRepository = productRepository;
        }

        public IList<Product> GetAll()
        {
            return productRepository.GetAll().ToList();
        }

        public Product GetById(int id)
        {
            return productRepository.GetById(id);
        }

        public Product GetByCode(string code)
        {
            return productRepository.GetByCode(code);
        }

        public async Task AddAsync(Product product)
        {
            if (productRepository.Exists(product.Code))
            {
                throw new DuplicateEntryException("The product has been previously added");
            }

            await productRepository.AddAsync(product);
        }

        public async Task UpdateAsync(Product product)
        {
            if (productRepository.Exists(product.Code, product.Id))
            {
                throw new DuplicateEntryException("The product has been previously added");
            }

            var productToUpdate = productRepository.GetById(product.Id);
            productToUpdate.Code = product.Code;
            productToUpdate.Name = product.Name;
            productToUpdate.Description = product.Description;
            productToUpdate.Price = product.Price;

            await productRepository.UpdateAsync(productToUpdate);
        }

    }
}
