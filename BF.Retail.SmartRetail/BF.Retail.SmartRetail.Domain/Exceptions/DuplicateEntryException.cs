using System;
using System.Runtime.Serialization;

namespace BF.Retail.SmartRetail.Domain.Exceptions
{
    [Serializable]
    public class DuplicateEntryException : BusinessException
    {
        /// <summary>
        /// 
        /// </summary>
        public DuplicateEntryException()
            : base()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        public DuplicateEntryException(string message)
            : base(message)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="message"></param>
        /// <param name="innerException"></param>
        public DuplicateEntryException(string message, System.Exception innerException)
            : base(message, innerException)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="innerException"></param>
        public DuplicateEntryException(System.Exception innerException)
            : base(innerException.Message, innerException)
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="info"></param>
        /// <param name="context"></param>
        public DuplicateEntryException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
