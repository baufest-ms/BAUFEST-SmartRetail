using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using BF.Retail.SmartRetail.Web.Models.API;
using System.Threading.Tasks;
using System.Web.Http;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public class PurchasesController : BaseAPIController
    {
        private readonly ICustomerManager customerManager;

        public PurchasesController(ICustomerManager customerManager)
        {
            this.customerManager = customerManager;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Add(PurchaseApiModel purchaseApiModel)
        {
            try
            {
                await customerManager.Purchase(purchaseApiModel.ToEntity());

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
