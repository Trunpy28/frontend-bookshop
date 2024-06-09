import React from "react";

const ContactPage = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px 15vw",
  };

  const formStyle = {
    maxWidth: "600px",
    width: "100%",
    marginBottom: "20px",
    marginTop: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
  };

  const textAreaStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    boxSizing: "border-box",
    height: "150px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  const mapStyle = {
    width: "100%",
    height: "400px",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <h1>Liên hệ</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1075.852278218103!2d105.84413589485185!3d21.002339701763773!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1717945871409!5m2!1svi!2s"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="BKshop Location"
        style={mapStyle}
        allowFullScreen=""
      ></iframe>
      <form style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Tên của bạn"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email của bạn"
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="subject"
          placeholder="Tiêu đề"
          required
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Nội dung"
          required
          style={textAreaStyle}
        ></textarea>
        <button type="submit" style={buttonStyle}>
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
