import EntList from '../components/EntList';
import WelcomeBand from '../components/WelcomeBand';

function ProjectsPage() {
  return (
    <div className="container mt-4">
      <WelcomeBand />
      <div className="row">
        <div className="col-md-9">
          <EntList />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
