using NLog;

namespace BF.Retail.SmartRetail.Business
{
    public abstract class BaseManager
    {
        // Common properties
        protected readonly ILogger logger = LogManager.GetCurrentClassLogger();

    }
}
