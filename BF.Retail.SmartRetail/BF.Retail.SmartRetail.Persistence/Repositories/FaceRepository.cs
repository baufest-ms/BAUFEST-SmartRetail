using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Entities;
using System.Data.Entity;
using System.Linq;

namespace BF.Retail.SmartRetail.Persistence.Repositories
{
    public class FaceRepository : BaseRepository<Face>, IFaceRepository
    {
        public override IQueryable<Face> GetAll()
        {
            return base.GetAll()
                .Include(face => face.Person)
                .Include(face => face.Person.Group);
        }

    }
}
