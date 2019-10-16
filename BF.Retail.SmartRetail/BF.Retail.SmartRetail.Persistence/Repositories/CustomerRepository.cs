using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Entities;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Persistence.Repositories
{
    public class CustomerRepository : BaseRepository, ICustomerRepository
    {
        public IQueryable<Purchase> GetAllPurchasesByPersonId(int personId)
        {
            return Context.Set<Purchase>()
                .Where(purchase => purchase.PersonId == personId)
                .Include(purchase => purchase.Product);
        }

        public IQueryable<Visualization> GetAllVisualizationsByPersonId(int personId)
        {
            return Context.Set<Visualization>()
                .Where(visualization => visualization.PersonId == personId)
                .Include(visualization => visualization.Product);
        }

        public async Task AddPurchaseAsync(Purchase purchase)
        {
            Context.Set<Purchase>().Add(purchase);
            await Context.SaveChangesAsync();
        }

        public async Task AddVisualizationAsync(Visualization visualization)
        {
            Context.Set<Visualization>().Add(visualization);
            await Context.SaveChangesAsync();
        }

        public bool ExistsPurchase(Purchase purchase)
        {
            return Context.Set<Purchase>()
                .Where(p => p.PersonId == purchase.PersonId && p.ProductId == purchase.ProductId)
                .Any();
        }

        public bool ExistsVisualization(Visualization visualization)
        {
            return Context.Set<Visualization>()
                .Where(v => v.PersonId == visualization.PersonId && v.ProductId == visualization.ProductId)
                .Any();
        }

    }
}
