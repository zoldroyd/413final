using Microsoft.AspNetCore.Mvc;
using final413.API.Data;

namespace final413.API.Controllers;

[Route("[controller]")]
[ApiController]
public class EntController : ControllerBase
{
    private EntDbContext _entContext;

    public EntController(EntDbContext temp)
    {
        _entContext = temp;
    }

    // [HttpGet("AllProjects")]
    // public IActionResult GetProjects(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
    // {
    //     var query = _entContext.Projects.AsQueryable();
    //
    //     if (projectTypes != null && projectTypes.Any())
    //     {
    //         query = query.Where(p => projectTypes.Contains(p.ProjectType));
    //     }
    //
    //     var totalNumProjects = query.Count();
    //
    //     var data = query
    //         .Skip((pageNum - 1) * pageSize)
    //         .Take(pageSize)
    //         .ToList();
    //
    //     var result = new
    //     {
    //         Projects = data,
    //         NumProjects = totalNumProjects
    //     };
    //
    //     return Ok(result);
    // }

    // [HttpGet("GetProjectTypes")]
    // public IActionResult GetProjectTypes()
    // {
    //     var projectTypes = _entContext.Projects
    //         .Select(p => p.ProjectType)
    //         .Distinct()
    //         .ToList();
    //
    //     return Ok(projectTypes);
    // }

    // [HttpPost("AddProject")]
    // public IActionResult AddProject([FromBody] Project newProject)
    // {
    //     _entContext.Projects.Add(newProject);
    //     _entContext.SaveChanges();
    //
    //     return Ok(newProject);
    // }

    // [HttpPut("updateProject/{projectId}")]
    // public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
    // {
    //     var existingProject = _entContext.Projects.Find(projectId);
    //
    //     existingProject.ProjectName = updatedProject.ProjectName;
    //     existingProject.ProjectType = updatedProject.ProjectType;
    //     existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
    //     existingProject.ProjectImpact = updatedProject.ProjectImpact;
    //     existingProject.ProjectPhase = updatedProject.ProjectPhase;
    //     existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
    //
    //     _entContext.Projects.Update(existingProject);
    //     _entContext.SaveChanges();
    //
    //     return Ok(existingProject);
    //
    // }

    // [HttpDelete("DeleteProject/{projectId}")]
    // public IActionResult DeleteProject(int projectId)
    // {
    //     var project = _entContext.Projects.Find(projectId);
    //
    //     if (project == null)
    //     {
    //         return NotFound(new { message = "Project not found" });
    //     }
    //
    //     _entContext.Projects.Remove(project);
    //     _entContext.SaveChanges();
    //
    //     return NoContent();
    // }
}