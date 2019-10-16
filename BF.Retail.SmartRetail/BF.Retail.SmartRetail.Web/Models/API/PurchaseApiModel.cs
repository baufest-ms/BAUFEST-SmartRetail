using BF.Retail.SmartRetail.Domain.Entities;

namespace BF.Retail.SmartRetail.Web.Models.API
{
    public class PurchaseApiModel
    {
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public Purchase ToEntity()
        {
            return new Purchase
            {
                PersonId = CustomerId,
                ProductId = ProductId
            };
        }
    }
}