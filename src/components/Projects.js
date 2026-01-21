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
            className="project-card"
            key={project.title}
            style={{ 
              cursor: "pointer",
              background: "#ffffff",
              borderRadius: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div 
              onClick={() => detailsModalShow(project)}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              {project.images && project.images.length > 0 ? (
                <img
                  src={project.images[0]}
                  alt="projectImages"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div 
                  style={{
                    height: "200px",
                    width: "100%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "20px",
                    boxSizing: "border-box"
                  }}
                >
                  {project.title}
                </div>
              )}
              <div style={{ padding: "15px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <span 
                  className="project-date"
                  style={{
                    fontSize: "14px",
                    backgroundColor: "#696969",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                    marginBottom: "10px",
                    alignSelf: "center"
                  }}
                >
                  {project.startDate}
                </span>
                <p 
                  style={{
                    margin: "10px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "black",
                    textAlign: "center"
                  }}
                >
                  {project.title}
                </p>
              </div>
            </div>
            {project.url && (
              <div style={{ padding: "0 15px 15px", textAlign: "center", display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                {project.url.includes("play.google.com") && (
                  <>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        borderRadius: "25px",
                        backgroundColor: "#01875f",
                        color: "white",
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        transition: "all 0.3s ease"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-google-play"></i>
                      Play Store
                    </a>
                    <button
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        borderRadius: "25px",
                        backgroundColor: "#000000",
                        color: "white",
                        border: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="fab fa-apple"></i>
                      App Store
                    </button>
                  </>
                )}
                {project.url.includes("github.com") && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      backgroundColor: "#24292e",
                      color: "white",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fab fa-github"></i>
                    GitHub
                  </a>
                )}
              </div>
            )}
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
            <div 
              className="projects-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                padding: "0 20px",
                maxWidth: "1200px",
                margin: "0 auto"
              }}
            >
              {projects}
            </div>
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
