﻿
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SrProj.API.Response;
using SrProj.API.Responses.Errors;
using SrProj.Models;
using SrProj.Models.Context;

namespace SrProj.API
{
    public class PatronController : ApiController
    {
        [HttpGet]
        public Patron Get([FromUri] int patronID)
        {
            return new PatronContext().Patrons.Find(patronID);
        }

        [HttpGet]
        public Patron[] Search([FromUri] string namePartial)
        {
            namePartial = namePartial.ToLower();
            return
                new PatronContext().Patrons.Where(
                    p => p.FirstName.ToLower().Contains(namePartial) || p.LastName.ToLower().Contains(namePartial)).ToArray();
        }

        [HttpPost]
        public HttpResponseMessage Create(Patron patron)
        {
            ApiResponse response = new ApiResponse(Request);
            try
            {
                patron.CreateDate = DateTime.Now;
                var patronContext = new PatronContext();
                patronContext.Patrons.Add(patron);
                patronContext.SaveChanges();

                response.data = response.DefaultSuccessResponse;
                return response.GenerateResponse(HttpStatusCode.Created);
            }
            catch(Exception e)
            {
                response.errors.Add(new InvalidPatron { source = e });
                return response.GenerateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}
