using NLog;
using System.Web.Http;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public abstract class BaseAPIController : ApiController
    {
        // Common properties
        protected readonly ILogger logger = LogManager.GetCurrentClassLogger();

    }
}