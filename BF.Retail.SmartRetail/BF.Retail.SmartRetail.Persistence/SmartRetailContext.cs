using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Reflection;

namespace BF.Retail.SmartRetail.Persistence
{
    public class SmartRetailContext : DbContext
    {
        public SmartRetailContext() : base("SmartRetail")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            MapearAssembly(modelBuilder);
        }

        private void MapearAssembly(DbModelBuilder modelBuilder)
        {
            var entitiesTypes = Assembly.Load("BF.Retail.SmartRetail.Domain").GetTypes().Where(type => type.Namespace == "BF.Retail.SmartRetail.Domain.Entities");
            var metodo = modelBuilder.GetType().GetMethod("Entity");

            foreach (var entityType in entitiesTypes)
            {
                metodo.MakeGenericMethod(entityType).Invoke(modelBuilder, null);
            }
        }
    }
}

