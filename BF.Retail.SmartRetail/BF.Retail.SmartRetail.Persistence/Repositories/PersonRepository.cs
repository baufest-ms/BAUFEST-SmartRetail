using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Entities;
using System;
using System.Data.Entity;
using System.Linq;

namespace BF.Retail.SmartRetail.Persistence.Repositories
{
    public class PersonRepository: BaseRepository<Person>, IPersonRepository
    {
        public override IQueryable<Person> GetAll()
        {
            return base.GetAll()
                .Include(person => person.Group);
        }

        public Person GetByAPIPersonId(Guid apiPersonId)
        {
            return GetAll().Where(person => person.APIPersonId == apiPersonId).FirstOrDefault();
        }

        public bool Exists(string email, int id = 0)
        {
            return GetAll().Where(person => person.Id != id && person.Email == email).Any();
        }

    }
}
