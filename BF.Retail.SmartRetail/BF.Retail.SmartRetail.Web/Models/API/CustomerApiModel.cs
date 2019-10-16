using BF.Retail.SmartRetail.Domain.DTOs;
using System;

namespace BF.Retail.SmartRetail.Web.Models.API
{
    public class CustomerApiModel
    {
        public string Fullname { get; set; }

        public string Email { get; set; }

        public string Photo { get; set; }

        public Customer ToDTO()
        {
            return new Customer
            {
                Fullname = Fullname,
                Email = Email,
                Photo = Convert.FromBase64String(Photo)
            };
        }

    }
}