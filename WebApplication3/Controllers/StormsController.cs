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
    public class StormsController : ApiController

    {
        private StormDbContext db = new StormDbContext();

        // GET api/Storms
        public IEnumerable<Storm> Get()
        {
            return db.Storms.ToList();
        }

        // GET api/Storm/5
        public IHttpActionResult Get(int id)
        {
            var Storm = db.Storms.Find(id);
            if (Storm == null)
            {
                return NotFound();
            }
            return Ok(Storm);
        }

        // GET api/Storms?userId=123
        public IEnumerable<Storm> Get(string userId)
        {
            return db.Storms.Where(h => h.UserID == userId).ToList();
        }

        // POST api/Storms
        public IHttpActionResult Post([FromBody] Storm Storm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Storms.Add(Storm);
                db.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // Handle database-related exceptions
                foreach (var entry in ex.Entries)
                {
                    if (entry.Entity is Storm entity)
                    {
                        var errorMessage = $"Error inserting entity of type {entity.GetType().Name}.";
                        // Log or handle the error as needed
                    }
                }
            }

            return Ok(Storm);
        }

        // PUT api/Storms/5
        public IHttpActionResult Put(int id, [FromBody] Storm Storm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Storm.Id)
            {
                return BadRequest();
            }

            db.Entry(Storm).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StormExists(id))
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

        // DELETE api/Storms/5
        public IHttpActionResult Delete(int id)
        {
            var Storm = db.Storms.Find(id);
            if (Storm == null)
            {
                return NotFound();
            }

            db.Storms.Remove(Storm);
            db.SaveChanges();

            return Ok(Storm);
        }

        private bool StormExists(int id)
        {
            return db.Storms.Any(e => e.Id == id);
        }
    }
}