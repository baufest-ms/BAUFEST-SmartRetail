using BF.Retail.SmartRetail.Domain.Entities;

namespace BF.Retail.SmartRetail.Web.Models.API
{
    public class VisualizationApiModel
    {
        public int CustomerId { get; set; }

        public int ProductId { get; set; }

        public Visualization ToEntity()
        {
            return new Visualization
            {
                PersonId = CustomerId,
                ProductId = ProductId
            };
        }
    }
}