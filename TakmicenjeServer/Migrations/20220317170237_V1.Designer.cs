﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(TakmicenjeContext))]
    [Migration("20220317170237_V1")]
    partial class V1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.15")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Models.Spoj", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Ocena")
                        .HasColumnType("int");

                    b.Property<int?>("SportID")
                        .HasColumnType("int");

                    b.Property<int?>("TakmicarID")
                        .HasColumnType("int");

                    b.Property<int?>("TakmicenjeID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("SportID");

                    b.HasIndex("TakmicarID");

                    b.HasIndex("TakmicenjeID");

                    b.ToTable("Spojevi");
                });

            modelBuilder.Entity("Models.Sport", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("ID");

                    b.ToTable("Sport");
                });

            modelBuilder.Entity("Models.Takmicar", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Drzava")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Ime")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.Property<string>("Prezime")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("ID");

                    b.ToTable("Takmicar");
                });

            modelBuilder.Entity("Models.Takmicenje", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Naziv")
                        .IsRequired()
                        .HasMaxLength(25)
                        .HasColumnType("nvarchar(25)");

                    b.HasKey("ID");

                    b.ToTable("Takmicenje");
                });

            modelBuilder.Entity("Models.Spoj", b =>
                {
                    b.HasOne("Models.Sport", "Sport")
                        .WithMany("SportTakmicar")
                        .HasForeignKey("SportID");

                    b.HasOne("Models.Takmicar", "Takmicar")
                        .WithMany("TakmicarSport")
                        .HasForeignKey("TakmicarID");

                    b.HasOne("Models.Takmicenje", "Takmicenje")
                        .WithMany("TakmicarSport")
                        .HasForeignKey("TakmicenjeID");

                    b.Navigation("Sport");

                    b.Navigation("Takmicar");

                    b.Navigation("Takmicenje");
                });

            modelBuilder.Entity("Models.Sport", b =>
                {
                    b.Navigation("SportTakmicar");
                });

            modelBuilder.Entity("Models.Takmicar", b =>
                {
                    b.Navigation("TakmicarSport");
                });

            modelBuilder.Entity("Models.Takmicenje", b =>
                {
                    b.Navigation("TakmicarSport");
                });
#pragma warning restore 612, 618
        }
    }
}