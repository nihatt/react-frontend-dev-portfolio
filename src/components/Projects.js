import React, { Component } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deps: {},
      detailsModalShow: false,
    };
  }

  getLinkIcon(url) {
    if (url && url.includes("play.google.com")) {
      return { icon: "fab fa-google-play", text: "Play Store" };
    } else if (url && url.includes("github.com")) {
      return { icon: "fab fa-github", text: "GitHub" };
    } else if (url && url.includes("apps.apple.com")) {
      return { icon: "fab fa-apple", text: "App Store" };
    }
    return { icon: "fas fa-external-link-alt", text: "View" };
  }

  render() {
    let detailsModalShow = (data) => {
      this.setState({ detailsModalShow: true, deps: data });
    };

    let detailsModalClose = () => this.setState({ detailsModalShow: false });
    if (this.props.resumeProjects && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.projects;
      var projects = this.props.resumeProjects.map((project) => {
        const linkInfo = this.getLinkIcon(project.url);
        return (
          <div
            className="col-sm-12 col-md-6 col-lg-4"
            key={project.title}
            style={{ cursor: "pointer" }}
          >
            <span className="portfolio-item d-block">
              <div className="foto" onClick={() => detailsModalShow(project)}>
                <div>
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt="projectImages"
                      height="230"
                      style={{marginBottom: 0, paddingBottom: 0, position: 'relative'}}
                    />
                  ) : (
                    <div 
                      style={{
                        height: "230px",
                        width: "100%",
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                        textAlign: "center",
                        padding: "20px",
                        borderRadius: "8px 8px 0 0"
                      }}
                    >
                      {project.title}
                    </div>
                  )}
                  <span className="project-date">{project.startDate}</span>
                  <br />
                  <p className="project-title-settings mt-3">
                    {project.title}
                  </p>
                </div>
              </div>
              {project.url && (
                <div className="text-center mt-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      borderRadius: "20px",
                      backgroundColor: "#6c5ce7",
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className={linkInfo.icon}></i>
                    {linkInfo.text}
                  </a>
                </div>
              )}
            </span>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span>{sectionName}</span>
          </h1>
          <div className="col-md-12 mx-auto">
            <div className="row mx-auto">{projects}</div>
          </div>
          <ProjectDetailsModal
            show={this.state.detailsModalShow}
            onHide={detailsModalClose}
            data={this.state.deps}
          />
        </div>
      </section>
    );
  }
}

export default Projects;
