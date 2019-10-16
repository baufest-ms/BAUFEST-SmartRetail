using BF.Retail.SmartRetail.Domain.DTOs;
using System.Threading.Tasks;
using BF.Retail.SmartRetail.Domain.Entities;
using System.Collections.Generic;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface ICustomerManager
    {
        Task<int> Register(Customer customer);

        Task Purchase(Purchase purchase);

        Task Visualize(Visualization visualization);

        Task<List<CandidateCustomer>> IdentifyCustomerCandidateAsync(int id, byte[] image);

        byte[] GetCustomerPhoto(int id);
    }
}
