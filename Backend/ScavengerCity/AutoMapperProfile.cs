using AutoMapper;
using ScavengerCity.Entities;
using ScavengerCity.Models;

namespace ScavengerCity
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<AnswerEntity, Answer>();
            CreateMap<HintEntity, Hint>();
            CreateMap<HuntEntity, Hunt>();
            CreateMap<HuntInstanceEntity, HuntInstance>();
            CreateMap<PurchaseEntity, Purchase>();
            CreateMap<QuestionEntity, Question>();
        }
    }
}