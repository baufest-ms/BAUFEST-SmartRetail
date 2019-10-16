using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.DTOs;
using BF.Retail.SmartRetail.Domain.Entities;
using BF.Retail.SmartRetail.Domain.Exceptions;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Business
{
    public class CustomerManager : BaseManager, ICustomerManager
    {
        private readonly IGroupManager groupManager;
        private readonly IPersonManager personManager;
        private readonly IFaceManager faceManager;
        private readonly ICustomerRepository customerRepository;

        public CustomerManager(IGroupManager groupManager, IPersonManager personManager, IFaceManager faceManager, ICustomerRepository customerRepository)
        {
            this.groupManager = groupManager;
            this.personManager = personManager;
            this.faceManager = faceManager;
            this.customerRepository = customerRepository;
        }

        public async Task<int> Register(Customer customer)
        {
            // 1. Save Person into Face API and into our DB
            var person = customer.ToPerson();
            person.GroupId = int.Parse(ConfigurationManager.AppSettings["DefaultGroupID"]);

            await personManager.AddAsync(person);

            // 2. Save Person's Picture into Face API and into our DB
            var face = customer.ToFace();
            face.PersonId = person.Id;

            await faceManager.AddAsync(face);

            // 3. Return User ID
            return person.Id;
        }

        public async Task Purchase(Purchase purchase)
        {
            if(customerRepository.ExistsPurchase(purchase))
            {
                throw new DuplicateEntryException();
            }

            await customerRepository.AddPurchaseAsync(purchase);
        }

        public async Task Visualize(Visualization visualization)
        {
            if (customerRepository.ExistsVisualization(visualization))
            {
                throw new DuplicateEntryException();
            }

            await customerRepository.AddVisualizationAsync(visualization);
        }

        public async Task<List<CandidateCustomer>> IdentifyCustomerCandidateAsync(int id, byte[] image)
        {
            // ToDo: Call SearchCandidatesAsync method from groupManager property and save the return value into candidates variable
            List<Candidate> candidates = null;
            var customersCandidates = new List<CandidateCustomer>();

            foreach (var candidate in candidates)
            {
                var customerCandidate = CandidateCustomer.NewFromCandidate(candidate);

                if (candidate.Id > 0)
                {
                    var faces = faceManager.GetAllByPersonId(candidate.Id);
                    customerCandidate.PhotoId = faces.Any() ? faces[0].Id : default(int);
                    // ToDo: Call GetAllPurchasesByPersonId method from customerRepository property and save the return value. Use candidate.Id as personId parameter and don't forget to call .ToList() before assign the results.
                    customerCandidate.Purchases = null;
                    // ToDo: Call GetAllVisualizationsByPersonId method from customerRepository property and save the return value. Use candidate.Id as personId parameter and don't forget to call .ToList() before assign the results.
                    customerCandidate.Visualizations = null;
                }

                customersCandidates.Add(customerCandidate);
            }

            return customersCandidates;
        }

        public byte[] GetCustomerPhoto(int id)
        {
            var face = faceManager.GetById(id);
            return face != null ? face.Photo : default(byte[]);
        }

    }
}
