﻿// <auto-generated />
using BetAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BetAPI.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20230315191250_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.BetEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("BET_LABEL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BET_OFFER_TYPE")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BET_OUTCOME")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BET_PLACED_DATE")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CRITERIA_NAME")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EVENT_NAME")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IS_LIVE")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LEAGUE")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("ODDS")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("OVER_1000_SEK")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PLAYER_BET_NUMBER")
                        .HasColumnType("int");

                    b.Property<int>("Player_no")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("BetEntities");
                });

            modelBuilder.Entity("Domain.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
