using BF.Retail.SmartRetail.Domain.Contracts.Clients;
using Microsoft.ProjectOxford.Face;
using Microsoft.ProjectOxford.Face.Contract;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;

namespace BF.Retail.SmartRetail.Business.Clients
{
    public class FaceAPIClient : IFaceAPIClient
    {
        protected readonly IFaceServiceClient faceServiceClient;

        protected readonly IEnumerable<FaceAttributeType> faceAttributes = new FaceAttributeType[]
        {
            FaceAttributeType.Gender,
            FaceAttributeType.Age,
            FaceAttributeType.HeadPose,
            FaceAttributeType.Smile,
            FaceAttributeType.FacialHair,
            FaceAttributeType.Glasses,
            FaceAttributeType.Emotion,
            FaceAttributeType.Hair,
            FaceAttributeType.Makeup,
            FaceAttributeType.Occlusion,
            FaceAttributeType.Accessories,
            FaceAttributeType.Blur,
            FaceAttributeType.Exposure,
            FaceAttributeType.Noise
        };

        public FaceAPIClient()
        {
            var subscriptionKey = ConfigurationManager.AppSettings["FaceApiSubscriptionKey"];
            var endpoint = ConfigurationManager.AppSettings["FaceApiEndpoint"];

            // ToDo: initialize faceServiceClient object here...
            // faceServiceClient = ...
        }

        #region - Group Managment -

        public async Task<bool> GroupExistsAsync(string code)
        {
            try
            {
                return await faceServiceClient.GetPersonGroupAsync(code) != null;
            }
            catch (FaceAPIException ex)
            {
                if (ex.ErrorCode == "PersonGroupNotFound")
                {
                    return false;
                }
                throw;
            }
        }

        public async Task GroupCreateAsync(string code, string name)
        {
            // ToDo: Invoke the API method to create a new person group
            throw new NotImplementedException();
        }

        public async Task GroupUpdateAsync(string code, string name)
        {
            // ToDo: Invoke the API method to update an existing person group
            throw new NotImplementedException();
        }

        public async Task GroupTrainAsync(string code)
        {
            // ToDo: Invoke the API method to train an existing person group
            throw new NotImplementedException();
        }

        #endregion - Group Managment -

        #region - Person Management -

        public async Task<Guid> PersonCreateAsync(string groupCode, string personName)
        {
            // ToDo: Invoke the API method to create a new person in an existing person group
            throw new NotImplementedException();

            Guid personId;

            //personId = ...
            return personId;
        }

        public async Task PersonUpdateAsync(string groupCode, Guid personId, string personName)
        {
            // ToDo: Invoke the API method to update an existing person in an existing person group
            throw new NotImplementedException();
        }

        #endregion - Person Management -

        #region - Face Management -

        public async Task<Guid> FaceAddAsync(string groupCode, Guid personId, byte[] image)
        {
            // ToDo: Invoke the API method to add a new face to an existing person
            throw new NotImplementedException();

            Guid persistedFaceId;

            //persistedFaceId = ...
            return persistedFaceId;
        }

        public async Task<Face[]> FaceDetectAsync(byte[] image)
        {
            // ToDo: Invoke the API method to detect faces in an image
            throw new NotImplementedException();
        }

        public async Task<Face[]> FaceCountFacesAsync(byte[] image)
        {
            return await faceServiceClient.DetectAsync(new MemoryStream(image), true, false, new FaceAttributeType[] { });
        }

        public async Task<IdentifyResult[]> FaceIdentifyFacesAsync(string groupCode, Guid[] faceIDs)
        {
            string largePersonGroupId = null;
            var confidenceThreshold = (float)0.65;
            var maxNumOfCandidatesReturned = 1;

            // ToDo: Invoke the API method to identify a face in an image
            throw new NotImplementedException();
        }

        #endregion - Face Management -
    }
}
