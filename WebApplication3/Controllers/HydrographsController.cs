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
    public class HydrographsController : ApiController

    {
        private HydrographDbContext db = new HydrographDbContext();

        // GET api/hydrographs
        public IEnumerable<Hydrograph> Get()
        {
            return db.Hydrographs.ToList();
        }

        // GET api/hydrograph/5
        public IHttpActionResult Get(int id)
        {
            var hydrograph = db.Hydrographs.Find(id);
            if (hydrograph == null)
            {
                return NotFound();
            }
            return Ok(hydrograph);
        }

        // GET api/hydrographs?userId=123
        public IEnumerable<Hydrograph> Get(string userId)
        {
            return db.Hydrographs.Where(h => h.UserID == userId).ToList();
        }

        // POST api/hydrographs
        public IHttpActionResult Post([FromBody] Hydrograph hydrograph)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                db.Hydrographs.Add(hydrograph);
                db.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                // Handle database-related exceptions
                foreach (var entry in ex.Entries)
                {
                    if (entry.Entity is Hydrograph entity)
                    {
                        var errorMessage = $"Error inserting entity of type {entity.GetType().Name}.";
                        // Log or handle the error as needed
                        //WHY WONT IT INSERT
                    }
                }
            }

            return Ok(hydrograph);
        }

        // PUT api/hydrographs/5
        public IHttpActionResult Put(int id, [FromBody] Hydrograph hydrograph)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hydrograph.Id)
            {
                return BadRequest();
            }

            db.Entry(hydrograph).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HydrographExists(id))
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

        // DELETE api/hydrographs/5
        public IHttpActionResult Delete(int id)
        {
            var hydrograph = db.Hydrographs.Find(id);
            if (hydrograph == null)
            {
                return NotFound();
            }

            db.Hydrographs.Remove(hydrograph);
            db.SaveChanges();

            return Ok(hydrograph);
        }

        private bool HydrographExists(int id)
        {
            return db.Hydrographs.Any(e => e.Id == id);
        }
    }
}