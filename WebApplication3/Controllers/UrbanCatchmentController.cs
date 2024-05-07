using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    public class UrbanCatchmentsController : ApiController

    {
        private UrbanCatchmentDbContext db = new UrbanCatchmentDbContext();

        // GET api/UrbanCatchments
        public IEnumerable<UrbanCatchment> Get()
        {
            return db.UrbanCatchments.ToList();
        }

        // GET api/UrbanCatchment/5
        public IHttpActionResult Get(int id)
        {
            var UrbanCatchment = db.UrbanCatchments.Find(id);
            if (UrbanCatchment == null)
            {
                return NotFound();
            }
            return Ok(UrbanCatchment);
        }

        // GET api/UrbanCatchments?userId=123
        public IEnumerable<UrbanCatchment> Get(string userId)
        {
            return db.UrbanCatchments.Where(h => h.UserID == userId).ToList();
        }

        // POST api/UrbanCatchments
        public IHttpActionResult Post([FromBody] UrbanCatchment UrbanCatchment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.UrbanCatchments.Add(UrbanCatchment);
                db.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // Handle database-related exceptions
                foreach (var entry in ex.Entries)
                {
                    if (entry.Entity is UrbanCatchment entity)
                    {
                        var errorMessage = $"Error inserting entity of type {entity.GetType().Name}.";
                        // Log or handle the error as needed
                    }
                }
            }

            return Ok(UrbanCatchment);
        }

        // PUT api/UrbanCatchments/5
        public IHttpActionResult Put(int id, [FromBody] UrbanCatchment UrbanCatchment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != UrbanCatchment.Id)
            {
                return BadRequest();
            }

            db.Entry(UrbanCatchment).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UrbanCatchmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // DELETE api/UrbanCatchments/5
        public IHttpActionResult Delete(int id)
        {
            var UrbanCatchment = db.UrbanCatchments.Find(id);
            if (UrbanCatchment == null)
            {
                return NotFound();
            }

            db.UrbanCatchments.Remove(UrbanCatchment);
            db.SaveChanges();

            return Ok(UrbanCatchment);
        }

        private bool UrbanCatchmentExists(int id)
        {
            return db.UrbanCatchments.Any(e => e.Id == id);
        }
    }
}