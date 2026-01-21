import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import AwesomeSlider from "react-awesome-slider";
import AwesomeSliderStyles from "../scss/light-slider.scss";
import AwesomeSliderStyles2 from "../scss/dark-slider.scss";
import "react-awesome-slider/dist/custom-animations/scale-out-animation.css";

class ProjectDetailsModal extends Component {
  getLinkInfo(url) {
    if (url && url.includes("play.google.com")) {
      return { icon: "fab fa-google-play", text: "Play Store" };
    } else if (url && url.includes("github.com")) {
      return { icon: "fab fa-github", text: "GitHub" };
    } else if (url && url.includes("apps.apple.com")) {
      return { icon: "fab fa-apple", text: "App Store" };
    }
    return { icon: "fas fa-external-link-alt", text: "View Project" };
  }

  render() {
    let title, description, url, linkInfo, tech, img;

    if (this.props.data) {
      const technologies = this.props.data.technologies;
      const images = this.props.data.images;
      title = this.props.data.title;
      description = this.props.data.description;
      url = this.props.data.url;
      linkInfo = this.getLinkInfo(url);

      if (this.props.data.technologies) {
        tech = technologies.map((icons, i) => {
          return (
            <li className="list-inline-item mx-3" key={i}>
              <span>
                <div className="text-center">
                  <i className={icons.class} style={{ fontSize: "300%" }}>
                    <p className="text-center" style={{ fontSize: "30%" }}>
                      {icons.name}
                    </p>
                  </i>
                </div>
              </span>
            </li>
          );
        });
      }

      // Hatanın çözüldüğü kısım: 'img' değişkenini burada tek seferde kontrol ediyoruz
      if (this.props.data.images && this.props.data.images.length > 0) {
        img = images.map((elem, i) => {
          return <div key={i} data-src={elem} />;
        });
      } else {
        img = null;
      }
    }

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modal-inside"
      >
        <span onClick={this.props.onHide} className="modal-close">
          <i className="fas fa-times fa-3x close-icon"></i>
        </span>
        <div className="col-md-12">
          {img ? (
            <div className="col-md-10 mx-auto" style={{ paddingBottom: "50px" }}>
              <div className="slider-tab">
                <span
                  className="iconify slider-iconfiy"
                  data-icon="emojione:red-circle"
                  data-inline="false"
                  style={{ marginLeft: "5px" }}
                ></span>{" "}
                &nbsp;{" "}
                <span
                  className="iconify slider-iconfiy"
                  data-icon="twemoji:yellow-circle"
                  data-inline="false"
                ></span>{" "}
                &nbsp;{" "}
                <span
                  className="iconify slider-iconfiy"
                  data-icon="twemoji:green-circle"
                  data-inline="false"
                ></span>
              </div>
              <AwesomeSlider
                cssModule={[AwesomeSliderStyles, AwesomeSliderStyles2]}
                animation="scaleOutAnimation"
                className="slider-image"
              >
                {img}
              </AwesomeSlider>
            </div>
          ) : (
            <div 
              className="col-md-10 mx-auto" 
              style={{ 
                paddingBottom: "30px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "10px",
                height: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px"
              }}
            >
              <h2 style={{ color: "white", margin: 0 }}>{title}</h2>
            </div>
          )}
          <div className="col-md-10 mx-auto">
            <h3 style={{ padding: "5px 5px 0 5px" }}>
              {title}
            </h3>
            {url ? (
              <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
                {url.includes("play.google.com") && (
                  <>
                    <a
                      href={url}
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
                    >
                      <i className="fab fa-google-play" style={{ fontSize: "18px" }}></i>
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
                      onClick={() => {}}
                    >
                      <i className="fab fa-apple" style={{ fontSize: "18px" }}></i>
                      App Store
                    </button>
                  </>
                )}
                {url.includes("github.com") && (
                  <a
                    href={url}
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
                  >
                    <i className="fab fa-github" style={{ fontSize: "18px" }}></i>
                    GitHub
                  </a>
                )}
              </div>
            ) : null}
            <p className="modal-description">{description}</p>
            <div className="col-md-12 text-center">
              <ul className="list-inline mx-auto">{tech}</ul>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ProjectDetailsModal;