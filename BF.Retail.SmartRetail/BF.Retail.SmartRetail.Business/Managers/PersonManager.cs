using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Contracts.Clients;
using BF.Retail.SmartRetail.Domain.Entities;
using BF.Retail.SmartRetail.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Business
{
    public class PersonManager : BaseManager, IPersonManager
    {
        private readonly IGroupRepository groupRepository;
        private readonly IPersonRepository personRepository;
        private readonly IFaceAPIClient faceAPIClient;

        public PersonManager(IGroupRepository groupRepository, IPersonRepository personRepository, IFaceAPIClient faceAPIClient)
        {
            this.groupRepository = groupRepository;
            this.personRepository = personRepository;
            this.faceAPIClient = faceAPIClient;
        }

        public IList<Person> GetAll()
        {
            return personRepository.GetAll().ToList();
        }

        public IList<Person> GetAllByGroupId(int groupId)
        {
            return personRepository.GetAll().Where(person => person.GroupId == groupId).ToList();
        }

        public Person GetById(int id)
        {
            return personRepository.GetById(id);
        }

        public async Task AddAsync(Person person)
        {
            if (personRepository.Exists(person.Email))
            {
                throw new DuplicateEntryException("The email has been previously registered");
            }

            var group = groupRepository.GetById(person.GroupId);

            person.APIPersonId = await faceAPIClient.PersonCreateAsync(group.Code, person.Fullname);

            await personRepository.AddAsync(person);
        }

        public async Task UpdateAsync(Person person)
        {
            if (personRepository.Exists(person.Email, person.Id))
            {
                throw new DuplicateEntryException("The email has been previously registered");
            }

            var personToUpdate = personRepository.GetById(person.Id);
            personToUpdate.Fullname = person.Fullname;
            personToUpdate.Email = person.Email;

            var group = groupRepository.GetById(person.GroupId);

            await faceAPIClient.PersonUpdateAsync(group.Code, personToUpdate.APIPersonId, personToUpdate.Fullname);

            await personRepository.UpdateAsync(personToUpdate);
        }

    }
}
