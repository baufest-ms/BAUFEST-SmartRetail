using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using BF.Retail.SmartRetail.Web.Areas.Admin.Models;
using BF.Retail.SmartRetail.Web.Controllers;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Areas.Admin.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly IProductManager productManager;

        public ProductsController(IProductManager productManager)
        {
            this.productManager = productManager;
        }

        public ActionResult Index()
        {
            var groupListViewModel = new ProductListViewModel()
            {
                List = productManager.GetAll().Select(product => new ProductViewModel(product))
            };

            return View(groupListViewModel);
        }

        public ActionResult Add()
        {
            var productViewModel = new ProductViewModel();

            return View(productViewModel);
        }

        [HttpPost]
        public async Task<ActionResult> Add(ProductViewModel productViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await productManager.AddAsync(productViewModel.ToEntity());
                    return RedirectToAction("Index");
                }

                return View(productViewModel);
            }
            catch (BusinessException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);

                return View(productViewModel);
            }
        }

        public ActionResult Edit(int id)
        {
            var productViewModel = new ProductViewModel(productManager.GetById(id));

            return View(productViewModel);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(ProductViewModel productViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await productManager.UpdateAsync(productViewModel.ToEntity());
                    return RedirectToAction("Index");
                }

                return View(productViewModel);
            }
            catch (BusinessException ex)
            {
                ModelState.AddModelError(string.Empty, ex.Message);

                return View(productViewModel);
            }
        }
    }
}