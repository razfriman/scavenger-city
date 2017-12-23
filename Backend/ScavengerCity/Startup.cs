using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ScavengerCity.Entities;
using ScavengerCity.Helpers;
using ScavengerCity.Models;
using ScavengerCity.Services;
using ScavengerCity.SignalR;
using SharpRaven.Core;
using Stripe;
using Swashbuckle.AspNetCore.Swagger;

namespace ScavengerCity
{
    public class Startup
    {
        private readonly ILoggerFactory _loggerFactory;

        public Startup(IConfiguration configuration, ILoggerFactory loggerFactory)
        {
            Configuration = configuration;
            _loggerFactory = loggerFactory;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // ===== Add Entity Framework =====
            var sqlConnectionString = Configuration.GetConnectionString("DataAccessPostgreSqlProvider");
            services.AddDbContext<ScavengerDbContext>(options =>
            {
                options.UseNpgsql(sqlConnectionString);
                //options.UseInMemoryDatabase("db");
            });

            // ===== Add Identity ========
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ScavengerDbContext>()
                .AddDefaultTokenProviders();

            // ===== Add Jwt Authentication ========
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["JwtIssuer"],
                        ValidAudience = Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

            // ===== Add Automapper =====
            services.AddAutoMapper();

            // ===== Add Swagger ====
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Scavenger City API", Version = "v1" });
            });

            // ==== Add Stripe ====
            services.Configure<StripeSettings>(Configuration.GetSection("Stripe"));

            // ==== Add SignalR ====
            services.AddSignalR();


            // ==== Add CORS =====
            services.AddCors();
            services.AddCors(options =>
            {
                options.AddPolicy(
                    "AllowSpecificOrigin",
                    builder => builder.WithOrigins(
                        "http://*.razfriman.com",
                        "http://localhost:4200"));

                options.AddPolicy(
                   "AllowAll",
                    builder => builder
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowAnyOrigin());
            });

            // ===== Add MVC ========
            services.Configure<MvcOptions>(x =>
            {
                x.Filters.Add<ResultWrapperFilter>();
                x.Filters.Add(new ExceptionFilter(_loggerFactory, new RavenClient(Configuration.GetSection("Sentry")["DNS"]), Configuration.GetSection("Sentry")["Release"]));
            });

            services.AddMvc();

            services.AddScoped<HuntInstanceService>();
            services.AddScoped<HuntService>();
            services.AddScoped<AccountService>();
            services.AddTransient(s => s.GetService<IHttpContextAccessor>().HttpContext.User);
        }

        public void Configure(
            IApplicationBuilder app,
            IHostingEnvironment env,
            ScavengerDbContext dbContext
        )
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            StripeConfiguration.SetApiKey(Configuration.GetSection("Stripe")["SecretKey"]);


            app.UseAuthentication();

            app.UseCors("AllowAll");

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Scavenger City API V1");
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<HuntHub>("hunt");
            });

            app.UseMvc();

            dbContext.Database.EnsureCreated();
        }
    }
}
