﻿
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace SrProj.Models.Context
{
    public class ContextBase : DbContext
    {
        public ContextBase() : base(ApplicationConfiguration.TargetConnectionString) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }

    //TODO: Not this.
    public class Database : ContextBase
    {
        public DbSet<Patron> Patrons { get; set; }
        public DbSet<EmergencyContact> EmergencyContacts { get; set; }
        public DbSet<AuthenticationToken> AuthenticationTokens { get; set; }
        public DbSet<Volunteer> Volunteers { get; set; }
        public DbSet<Role> Roles { get; set; }
    }
}