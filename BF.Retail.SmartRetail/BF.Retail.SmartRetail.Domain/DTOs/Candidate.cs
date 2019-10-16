using BF.Retail.SmartRetail.Domain.Entities;
using Microsoft.ProjectOxford.Common.Contract;
using Microsoft.ProjectOxford.Face.Contract;
using System;

namespace BF.Retail.SmartRetail.Domain.DTOs
{
    public class Candidate
    {
        public int Id { get; set; }

        public string Fullname { get; set; }

        public string Email { get; set; }

        public Group Group { get; set; }

        public Guid APIPersonId { get; set; }

        public double Confidence { get; set; }

        public double Age { get; set; }

        public string Gender { get; set; }

        public FaceRectangle FaceRectangle { get; set; }

        public EmotionScores Emotions { get; set; }

        public Candidate()
        {
            Fullname = string.Empty;
            Email = string.Empty;
        }

        public void AssociateWith(Entities.Person person)
        {
            Id = person.Id;
            Fullname = person.Fullname;
            Email = person.Email;
            Group = person.Group;
            APIPersonId = person.APIPersonId;
        }
    }
}
