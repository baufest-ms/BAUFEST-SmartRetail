using BF.Retail.SmartRetail.Domain.Entities;

namespace BF.Retail.SmartRetail.Domain.DTOs
{
    public class Customer
    {
        public string Fullname { get; set; }

        public string Email { get; set; }

        public byte[] Photo { get; set; }

        public Person ToPerson()
        {
            return new Person
            {
                Fullname = Fullname,
                Email = Email
            };
        }

        public Face ToFace()
        {
            return new Face
            {
                Photo = Photo
            };
        }
    }
}
