import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-vh-100 d-flex flex-column flex-md-row align-items-center justify-content-center"
      style={{ backgroundColor: "#f97316" }}
    >
      {/* Left Section */}
      <div
        className="d-flex flex-column justify-content-center p-4 flex-grow-1 text-white"
        style={{ maxWidth: "800px" }}
      >
        <h1 className="display-4 fw-bold text-black mb-3 text-center text-md-start">
          The All-in-One Ticket Hub
          <div className="text-white">Buy, Sell and Trade</div>
        </h1>
        <p className="lead text-white mb-4 text-center text-md-start fw-semibold">
          A seamless all-in-one platform for trading tickets across events and
          transportation. With smart matching and secure exchanges, it ensures
          convenience and reliability. Whether finding last-minute tickets or
          reselling, enjoy a hassle-free experience.
        </p>

        {/* Location & Date Card */}
        <div
          className="bg-white text-dark rounded shadow p-3 d-flex flex-column flex-md-row align-items-center gap-3 w-100"
          style={{ maxWidth: "500px" }}
        >
          <div className="flex-grow-1 w-100">
            <label className="form-label small fw-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Current Location"
            />
          </div>
          <div className="flex-grow-1 w-100">
            <label className="form-label small fw-semibold mb-1">Date</label>
            <input type="date" className="form-control form-control-sm" />
          </div>
          <div className="mt-2 mt-md-4 w-100">
            <Link
              to="/buy-tickets"
              className="btn btn-warning text-white fw-semibold w-100"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section: 4 Animated Image Cards */}
      <div className="d-flex flex-wrap gap-3 justify-content-center p-4 flex-grow-1">
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <div
            key={card}
            className="card shadow-sm rounded-3 animate-card"
            style={{
              width: "150px",
              height: "200px",
              // overflow: "hidden",
              // textAlign: "center",
              display: "grid",
              flexDirection: "row",
              transition: "transform 0.3s ease",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              maxWidth: "350px",
              marginTop: "1rem",
            }}
          >
            <div
              className="animate-image"
              style={{
                height: "60%",
                background: `url('/head${card}.jpeg') center/cover no-repeat`,
              }}
            ></div>
            <div
              style={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0.5rem",
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  marginBottom: 0,
                }}
              >
                Ticket {card}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
