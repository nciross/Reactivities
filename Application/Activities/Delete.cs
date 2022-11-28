using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var activity = await _dataContext.Activities.FindAsync(request.Id);
                _dataContext.Remove(activity);
                await _dataContext.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}