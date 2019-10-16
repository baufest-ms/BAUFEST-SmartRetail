using BF.Retail.SmartRetail.Domain.Entities;
using System.Collections.Generic;

namespace BF.Retail.SmartRetail.Domain.DTOs
{
    public class CandidateCustomer : Candidate
    {
        public int PhotoId { get; set; }

        public List<Purchase> Purchases { get; set; }

        public List<Visualization> Visualizations { get; set; }

        public CandidateCustomer()
        {
            PhotoId = default(int);
            Purchases = new List<Purchase>();
            Visualizations = new List<Visualization>();
        }

        public static CandidateCustomer NewFromCandidate(Candidate candidate)
        {
            return new CandidateCustomer
            {
                Id = candidate.Id,
                Fullname = candidate.Fullname,
                Email = candidate.Email,
                Group = candidate.Group,
                APIPersonId = candidate.APIPersonId,
                Confidence = candidate.Confidence,
                Age = candidate.Age,
                Gender = candidate.Gender,
                FaceRectangle = candidate.FaceRectangle,
                Emotions = candidate.Emotions,
            };
        }

    }
}
