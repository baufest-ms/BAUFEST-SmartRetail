using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Domain
{
    public interface IBaseRepository
    {

    }

    public interface IBaseRepository<TEntity> : IBaseRepository where TEntity : BaseEntity
    {
        IQueryable<TEntity> GetAll();

        TEntity GetById(int id);

        Task AddAsync(TEntity entity);

        Task UpdateAsync(TEntity entity);

        Task DeleteAsync(TEntity entity);

    }
}
