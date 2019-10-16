using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Contracts.Clients;
using BF.Retail.SmartRetail.Domain.DTOs;
using BF.Retail.SmartRetail.Domain.Entities;
using BF.Retail.SmartRetail.Domain.Exceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Business
{
    public class GroupManager : BaseManager, IGroupManager
    {
        private readonly IGroupRepository groupRepository;
        private readonly IPersonRepository personRepository;
        private readonly IFaceAPIClient faceAPIClient;

        public GroupManager(IGroupRepository groupRepository, IPersonRepository personRepository, IFaceAPIClient faceAPIClient)
        {
            this.groupRepository = groupRepository;
            this.personRepository = personRepository;
            this.faceAPIClient = faceAPIClient;
        }

        public IList<Group> GetAll()
        {
            return groupRepository.GetAll().ToList();
        }

        public Group GetById(int id)
        {
            return groupRepository.GetById(id);
        }

        public async Task AddAsync(Group group)
        {
            if (!(await faceAPIClient.GroupExistsAsync(group.Code)))
            {
                await faceAPIClient.GroupCreateAsync(group.Code, group.Name);

                await groupRepository.AddAsync(group);
            }
            else
            {
                throw new BusinessException($"Person group '{group.Code}' already exists.");
            }
        }

        public async Task UpdateAsync(Group group)
        {
            await faceAPIClient.GroupUpdateAsync(group.Code, group.Name);

            await groupRepository.UpdateAsync(group);
        }

        public async Task<List<Candidate>> SearchCandidatesAsync(int id, byte[] image)
        {
            // ToDo: Get the group details from the groupRepository
            Group group = null;

            // ToDo: Call FaceDetectAsync method from faceAPIClient property and save the return value into faces variable
            Microsoft.ProjectOxford.Face.Contract.Face[] faces = null;

            if (faces.Length > 0)
            {
                var candidates = faces.Select(c => new Candidate { Age = c.FaceAttributes.Age, Gender = c.FaceAttributes.Gender, FaceRectangle = c.FaceRectangle, Emotions = c.FaceAttributes.Emotion }).ToList();
                var faceIDs = faces.Select(p => p.FaceId).ToArray();

                // ToDo: Call FaceIdentifyFacesAsync method from faceAPIClient property and save the return value into identifyResult variable
                Microsoft.ProjectOxford.Face.Contract.IdentifyResult[] identifyResult = null;

                for (int i = 0; i < identifyResult.Length; i++)
                {
                    var result = identifyResult[i];

                    if (result.Candidates.Length > 0)
                    {
                        var candidate = result.Candidates[0];
                        // ToDo: Get the Person entity from the candidate.PersonId using the GetByAPIPersonId method from personRepository property
                        Person person = null;

                        if (person != null)
                        {
                            candidates[i].AssociateWith(person);
                            candidates[i].Confidence = candidate.Confidence;
                        }
                    }
                }

                return candidates;
            }
            else
            {
                return new List<Candidate>();
            }
        }

    }
}
