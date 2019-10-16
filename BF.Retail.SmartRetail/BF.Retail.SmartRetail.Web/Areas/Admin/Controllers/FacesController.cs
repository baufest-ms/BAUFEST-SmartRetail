using BF.Retail.SmartRetail.Domain.Contracts;
using BF.Retail.SmartRetail.Domain.Exceptions;
using BF.Retail.SmartRetail.Web.Areas.Admin.Models;
using BF.Retail.SmartRetail.Web.Controllers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Areas.Admin.Controllers
{
    public class FacesController : BaseController
    {
        private readonly IPersonManager personManager;
        private readonly IFaceManager faceManager;

        public FacesController(IPersonManager personManager, IFaceManager faceManager)
        {
            this.personManager = personManager;
            this.faceManager = faceManager;
        }

        public ActionResult Index(int? personId = null, int? groupId = null)
        {
            var faceListViewModel = new FaceListViewModel()
            {
                List = personId.HasValue ?
                    faceManager.GetAllByPersonId(personId.Value).Select(face => new FaceViewModel(face)) :
                    groupId.HasValue ?
                        faceManager.GetAllByGroupId(groupId.Value).Select(face => new FaceViewModel(face)) :
                        faceManager.GetAll().Select(face => new FaceViewModel(face))
            };

            return View(faceListViewModel);
        }

        public ActionResult GetPhoto(int id)
        {
            try
            {
                var face = faceManager.GetById(id);

                return new FileStreamResult(new MemoryStream(face != null ? face.Photo : default(byte[])), "image/png");
            }
            catch (Exception ex)
            {
                logger.Error(ex);
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        public ActionResult Add(int? personId = null, int? groupId = null)
        {
            var faceViewModel = new FaceViewModel()
            {
                PersonList = FillPersonList(personId)
            };

            return View(faceViewModel);
        }

        [HttpPost]
        public async Task<ActionResult> Add(FaceViewModel faceViewModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await faceManager.AddAsync(faceViewModel.ToEntity());

                    return new HttpStatusCodeResult(HttpStatusCode.Created);
                }

                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "Complete all the mandatory fields, please");
            }
            catch (BusinessException ex)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        private IEnumerable<SelectListItem> FillPersonList(int? personId)
        {
            if (personId.HasValue && personId.Value > 0)
            {
                var person = personManager.GetById(personId.Value);

                return new List<SelectListItem>() {
                    new SelectListItem()
                    {
                        Value = person.Id.ToString(),
                        Text = person.Fullname,
                        Selected = true,
                    }
                };
            }
            else
            {
                return personManager.GetAll()
                    .Select(person => new SelectListItem()
                    {
                        Value = person.Id.ToString(),
                        Text = person.Fullname,
                        Selected = person.Id == personId,
                    });
            }
        }
    }
}