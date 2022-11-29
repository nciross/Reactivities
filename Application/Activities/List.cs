
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>>
        {

        }
        public class Hundler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _dataContext;

            public Hundler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _dataContext.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}