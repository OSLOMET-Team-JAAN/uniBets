﻿using Domain;
using Microsoft.EntityFrameworkCore;


namespace BetAPI.Data;

public sealed class Context : DbContext
{
    public Context(DbContextOptions<Context> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<User> Users { get; set; }
}