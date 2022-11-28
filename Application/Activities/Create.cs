using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Activity Activity { get; set; }
        }
        public class Hundler : IRequestHandler<Command>
        {
            private readonly DataContext _dataContext;

            public Hundler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                await _dataContext.Activities.AddAsync(request.Activity);
                await _dataContext.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}