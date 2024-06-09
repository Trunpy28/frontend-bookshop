import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../../assets/images/bookshop_logo.jpg";

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '30px 15vw',
    position: 'relative',
    bottom: '0',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 -1px 6px rgba(0, 0, 0, 0.1)',
    fontSize: '16px'
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const columnStyle = {
    flex: '1',
    margin: '10px',
    minWidth: '150px',
  };

  const linkStyle = {
    display: 'block',
    margin: '5px 0',
    color: '#00A651',
    textDecoration: 'none',
  };

  const logoStyle = {
    height: '50px',
    marginBottom: '10px',
  };

  const copyStyle = {
    marginTop: '20px',
    color: '#6c757d',
  };

  return (
    <footer style={footerStyle}>
      <div style={sectionStyle}>
        <div style={columnStyle}>
          <img src={logo} alt="BKshop Logo" style={logoStyle} />
          <p>BKshop - Cửa hàng sách trực tuyến</p>
        </div>
        <div style={columnStyle}>
          <h4>Thông tin</h4>
          <Link to="/" style={linkStyle}>Trang chủ</Link>
          <Link to="/contact" style={linkStyle}>Cửa hàng</Link>
          <Link to="/contact" style={linkStyle}>Giới thiệu</Link>
          <Link to="/contact" style={linkStyle}>Liên hệ</Link>
        </div>
        <div style={columnStyle}>
          <h4>Hỗ trợ khách hàng</h4>
          <Link style={linkStyle}>Vận chuyển</Link>
          <Link style={linkStyle}>Đổi trả</Link>
          <Link style={linkStyle}>Câu hỏi thường gặp</Link>
        </div>
        <div style={columnStyle}>
          <h4>Liên hệ</h4>
          <Link style={linkStyle}>Facebook</Link>
          <Link style={linkStyle}>Twitter</Link>
          <Link style={linkStyle}>Instagram</Link>
        </div>
      </div>
      <div style={copyStyle}>
        &copy; 2024 BKshop. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;