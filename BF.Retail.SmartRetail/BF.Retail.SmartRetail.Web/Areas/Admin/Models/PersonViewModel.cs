using BF.Retail.SmartRetail.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace BF.Retail.SmartRetail.Web.Areas.Admin.Models
{
    public class PersonViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [StringLength(50, ErrorMessage = "The field '{0}' must have a maximum of {1} characters")]
        public string Fullname { get; set; }

        [Required(ErrorMessage = "The field '{0}' is mandatory")]
        [StringLength(50, ErrorMessage = "The field '{0}' must have a maximum of {1} characters")]
        public string Email { get; set; }

        [Display(Name = "Group")]
        [Required(ErrorMessage = "The field 'Group' is mandatory")]
        public int GroupId { get; set; }

        public GroupViewModel Group { get; set; }

        public Guid APIPersonId { get; set; }

        public IEnumerable<SelectListItem> GroupList { get; set; }
        
        public PersonViewModel()
        {
            GroupList = new List<SelectListItem>();
        }

        public PersonViewModel(Person personEntity)
        {
            Id = personEntity.Id;
            Fullname = personEntity.Fullname;
            Email = personEntity.Email;
            GroupId = personEntity.GroupId;
            Group = new GroupViewModel(personEntity.Group);
            APIPersonId = personEntity.APIPersonId;
        }

        public Person ToEntity()
        {
            return new Person
            {
                Id = Id,
                Fullname = Fullname,
                Email = Email,
                GroupId = GroupId
            };
        }

    }
}