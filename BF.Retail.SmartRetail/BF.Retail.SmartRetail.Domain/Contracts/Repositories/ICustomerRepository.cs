using BF.Retail.SmartRetail.Domain.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain.Contracts
{
    public interface ICustomerRepository : IBaseRepository
    {
        IQueryable<Purchase> GetAllPurchasesByPersonId(int personId);

        IQueryable<Visualization> GetAllVisualizationsByPersonId(int personId);

        Task AddPurchaseAsync(Purchase purchase);

        Task AddVisualizationAsync(Visualization visualization);

        bool ExistsPurchase(Purchase purchase);

        bool ExistsVisualization(Visualization visualization);

    }
}
