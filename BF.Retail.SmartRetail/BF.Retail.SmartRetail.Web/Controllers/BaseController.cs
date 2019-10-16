using NLog;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Controllers
{
    public abstract class BaseController : Controller
    {
        // Common properties
        protected readonly ILogger logger = LogManager.GetCurrentClassLogger();

    }
}