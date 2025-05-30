import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import NihalImg from "../assets/Nihal.jpg"

const AboutUs = () => {
  const developers = [
    {
      name: 'Nihal Yadav',
      role: 'Backend Developer',
      img: '/assets/nihal.JPG',
      github: 'https://github.com/Nih-0',
      instagram: 'https://www.instagram.com/not__nihal_?igsh=MTc3aWl0ZXQwMmQ2aw==',
      linkedin: 'https://www.linkedin.com/in/nihal-yadav-',
    },
    {
      name: 'Saumy Mishra',
      role: 'Frontend Developer',
      img: 'saumy.jpg',
      github: 'https://github.com/saumymishra',
      instagram: 'https://instagram.com/saumymishra',
      linkedin: 'https://linkedin.com/in/saumymishra',
    },
  ];

  return (
    <section className="py-4 about-us-section text-white" style={{ backgroundColor: "#f97316", minHeight: "100vh" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Content */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h3 className="text-uppercase text-white-50 small mb-2"></h3>
            <h1 className="display-5 fw-bold mb-4">
              About TicketTrade<br />
            </h1>
            <p className="mb-3 text-white">
              Minimize last-minute panic and reduce ticket waste. Every year, thousands of tickets go unused while countless fans miss out on experiences. We're here to change that.
            </p>
            <p className="mb-3 text-white">
              Have an extra ticket you can't use? Looking for a last-minute entry to a sold-out event? TicketTrade is your go-to platform for hassle-free ticket buying and selling, designed to bring people together through the events they love.
            </p>
            {/* <p>
              Coming Soon: Admin Dashboard, Voice Search, and Smart Recommendations to personalize your experience.
            </p> */}
          </div>

          {/* Right Side - Developer Profiles */}
          <div className="col-md-6">
            {/* Black "Our Team" Heading */}
            <h1 className="display-6 fw-bold mb-4 text-center text-dark">Our Team</h1>

            <div className="row">
              {developers.map((dev, idx) => (
                <div key={idx} className="col-12 col-md-6 mb-4">
                  <div className="bg-white rounded p-3 text-center shadow-sm h-100 d-flex flex-column align-items-center justify-content-center transition-transform hover-translate">
                    <div className="rounded-circle overflow-hidden mb-3 border border-warning shadow" style={{ width: '100px', height: '100px' }}>
                      <img
                        src={NihalImg}
                        alt={dev.name}
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <h5 className="fw-semibold text-dark mb-1">{dev.name}</h5>
                    <p className="text-warning text-uppercase small mb-2 text-black">{dev.role}</p>
                    <div className="d-flex justify-content-center gap-3">
                      <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                        <FaGithub size={18} />
                      </a>
                      <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                        <FaInstagram size={18} />
                      </a>
                      <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                        <FaLinkedin size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Hover effect styles */}
      <style jsx>{`
        .hover-translate:hover {
          transform: rotate(-3deg) scale(1.05);
          transition: transform 0.3s ease;
        }
        .hover-text-warning:hover {
          color: #fd7e14 !important; /* Bootstrap orange-500 */
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
