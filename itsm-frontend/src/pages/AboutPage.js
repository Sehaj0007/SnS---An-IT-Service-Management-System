import React, { useEffect } from 'react';
import { Tools } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  useEffect(() => {
    // Animate skill bars on component mount
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar) => {
      const percent = bar.getAttribute('data-skill');
      setTimeout(() => {
        bar.style.transition = 'width 1.5s cubic-bezier(.4,2,.3,1)';
        bar.style.width = percent + '%';
      }, 300);
    });

    // Initialize carousel
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
      // Bootstrap carousel will auto-initialize with data-bs-ride attribute
    }
  }, []);

  const testimonials = [
    {
      text: "Quick and efficient — fixed my laptop and upgraded storage with zero hassle.",
      rating: 5,
      name: "Arjun S.",
      color: "text-primary"
    },
    {
      text: "Very professional and patient. Helped me set up a home network and explained everything.",
      rating: 4.5,
      name: "Neha K.",
      color: "text-success"
    },
    {
      text: "Excellent service! Resolved a stubborn virus issue and recovered my data.",
      rating: 5,
      name: "Ravi M.",
      color: "text-warning"
    },
    {
      text: "Reasonable pricing and timely support. Would definitely recommend to friends.",
      rating: 4,
      name: "Priya S.",
      color: "text-info"
    },
    {
      text: "Friendly, skilled and quick — helped me choose parts and build a great custom PC.",
      rating: 4.5,
      name: "Asha R.",
      color: "text-danger"
    },
    {
      text: "Reliable and knowledgeable. My go-to person for all PC and network issues.",
      rating: 4.5,
      name: "Vikram D.",
      color: "text-secondary"
    }
  ];

  const features = [
    {
      icon: "bi-lightning-charge",
      title: "Fast Response",
      description: "Quick turnaround for all your IT needs, minimizing downtime.",
      delay: "0s"
    },
    {
      icon: "bi-shield-check",
      title: "Trusted Expertise",
      description: "Certified and experienced in the latest technologies and best practices.",
      delay: "0.1s"
    },
    {
      icon: "bi-person-hearts",
      title: "Personalized Service",
      description: "Tailored solutions and friendly support for every client.",
      delay: "0.2s"
    },
    {
      icon: "bi-currency-dollar",
      title: "Affordable Pricing",
      description: "Competitive rates with no hidden fees or surprises.",
      delay: "0.3s"
    }
  ];

  const skills = [
    { name: "PC Building & Repair", level: "Expert", years: 15, color: "bg-primary" },
    { name: "Network Setup", level: "Advanced", years: 12, color: "bg-success" },
    { name: "Virus Removal", level: "Advanced", years: 10, color: "bg-danger" },
    { name: "Customer Support", level: "Expert", years: 18, color: "bg-info" }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half text-warning"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star text-warning"></i>);
    }

    return stars;
  };

  return (
    <div>

      {/* Hero Section */}
      <section 
        className="hero position-relative d-flex align-items-center justify-content-center text-white" 
        style={{
          background: 'linear-gradient(135deg, rgba(0,123,255,0.7), rgba(40,167,69,0.7)), url("/images/technician.jpg") center/cover no-repeat',
          minHeight: '50vh'
        }}
      >
        <div 
          className="hero-glass position-absolute top-0 start-0 w-100 h-100" 
          style={{ backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.3)' }}
        ></div>
        <div className="container text-center position-relative" style={{ zIndex: 2 }}>
          <h1 className="display-3 fw-bold mb-3 animate__animated animate__fadeInDown">Empowering Your Digital World</h1>
          <p className="lead animate__animated animate__fadeInUp mb-4">Expert IT Solutions for Home & Business. Fast. Reliable. Personal.</p>
          <a href="/contact" className="btn btn-lg btn-primary shadow animate__animated animate__pulse animate__infinite">Get in Touch</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">About Me</h2>
          <div className="row align-items-center justify-content-center mb-5">
            <div className="col-md-5 mb-4 mb-md-0 d-flex align-items-stretch justify-content-center">
              <div 
                className="card shadow border-0 animate__animated animate__zoomIn d-flex align-items-center justify-content-center bg-transparent p-0" 
                style={{ boxShadow: 'none !important', background: 'none !important' }}
              >
                <div 
                  className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center shadow" 
                  style={{ width: '264px', height: '264px', background: '#fff' }}
                >
                  <img src="/images/panda.png" alt="IT Technician" className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>
            <div className="col-md-7 d-flex align-items-stretch">
              <div className="card shadow border-0 p-4 animate__animated animate__fadeInRight w-100 h-100">
                <h3 className="fw-bold mb-3">Hi, I'm <span className="text-primary">Sehajpreet Kaur</span></h3>
                <p className="mb-3">
                  <Tools className="text-primary me-2" /> I'm a self-employed IT technician with 25+ years of experience solving software & hardware issues, building custom PCs, and setting up networks. I'm passionate about helping people and businesses get the most out of their technology.
                </p>
                <ul className="list-unstyled mb-0">
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Custom PC Builds & Upgrades</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Network Setup & Troubleshooting</li>
                  <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Virus & Malware Removal</li>
                  <li><i className="bi bi-check-circle-fill text-success me-2"></i>Consulting & Training</li>
                </ul>
              </div>
            </div>
          </div>

<br></br>
          {/* Why Choose Me Feature Grid */}
          <div className="row text-center mb-5">
            {features.map((feature, index) => (
              <div key={index} className="col-md-3 mb-4">
                <div 
                  className="feature-card p-4 h-100 shadow-sm rounded bg-white animate__animated animate__fadeInUp" 
                  style={{ animationDelay: feature.delay }}
                >
                  <i className={`${feature.icon} display-4 text-primary mb-3`}></i>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="small">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <hr></hr><br></br>

          <h4 className="fw-bold mb-4 text-center">My Skills</h4>
          <div className="row g-4 justify-content-center">
          {skills.map((skill, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-6">
              <div className="skill-card p-4 shadow-sm bg-white rounded-3">
                
                <h5 className="fw-bold mb-2">{skill.name}</h5>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className={`badge ${skill.color}`}>{skill.level}</span>
                  <small className="text-muted">{skill.years} years</small>
                </div>

                <div className="progress rounded-pill" style={{ height: "8px" }}>
                  <div 
                    className={`progress-bar ${skill.color}`} 
                    role="progressbar" 
                    style={{ width: skill.level === "Expert" ? "95%" : "80%" }}
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
        <br></br><br></br>
        <br></br> 
        <hr></hr>
        <br></br>


          {/* Testimonials Carousel */}
          <div className="row">
            <div className="col-md-10 mx-auto">
              <h4 className="fw-bold mb-4 text-center">What Clients Say</h4>
              <div id="testimonialCarousel" className="carousel slide carousel-dark" data-bs-ride="carousel" data-bs-interval="10000">
                <div className="carousel-inner">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <div className="card p-4 shadow-sm border-0 text-center">
                        <p className="mb-3">"{testimonial.text}"</p>
                        <div className="mb-2">
                          {renderStars(testimonial.rating)}
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                          <i className={`bi bi-person-circle fs-2 me-2 ${testimonial.color}`}></i>
                          <span className="fw-bold">— {testimonial.name}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inline CSS */}
        <style>{`
          .feature-card:hover {
            transform: translateY(-8px) scale(1.03);
            box-shadow: 0 8px 32px rgba(0,0,0,0.15)!important;
            transition: all 0.3s cubic-bezier(.4,2,.3,1);
          }
          .progress-bar {
            font-weight: 600;
          }
          .hero-glass {
            pointer-events: none;
          }
          .animate__animated {
            animation-duration: 1s;
            animation-fill-mode: both;
          }
          .animate__fadeInDown {
            animation-name: fadeInDown;
          }
          .animate__fadeInUp {
            animation-name: fadeInUp;
          }
          .animate__zoomIn {
            animation-name: zoomIn;
          }
          .animate__fadeInRight {
            animation-name: fadeInRight;
          }
          .animate__pulse {
            animation-name: pulse;
          }
          .animate__infinite {
            animation-iteration-count: infinite;
          }
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translate3d(0, -100%, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 100%, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          @keyframes zoomIn {
            from {
              opacity: 0;
              transform: scale3d(0.3, 0.3, 0.3);
            }
            to {
              opacity: 1;
            }
          }
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translate3d(100%, 0, 0);
            }
            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }
          @keyframes pulse {
            from {
              transform: scale3d(1, 1, 1);
            }
            50% {
              transform: scale3d(1.05, 1.05, 1.05);
            }
            to {
              transform: scale3d(1, 1, 1);
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default About;