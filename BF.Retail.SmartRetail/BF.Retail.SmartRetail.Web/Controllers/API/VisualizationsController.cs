using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using BF.Retail.SmartRetail.Web.Models.API;
using System.Threading.Tasks;
using System.Web.Http;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public class VisualizationsController : BaseAPIController
    {
        private readonly ICustomerManager customerManager;

        public VisualizationsController(ICustomerManager customerManager)
        {
            this.customerManager = customerManager;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Add(VisualizationApiModel visualizationApiModel)
        {
            try
            {
                await customerManager.Visualize(visualizationApiModel.ToEntity());

                return Ok();
            }
            catch (DuplicateEntryException)
            {
                return Conflict();
            }
            catch (BusinessException ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
