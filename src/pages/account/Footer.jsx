const Footer_Primary = () => (
  <footer
    style={{
      backgroundColor: "var(--primary-blue)",
      borderTop: "2px solid var(--primary-blue)",
      position: "fixed",
      width: "100%",
      left: 0,
      height: "70px",
      bottom: 0,
      color: "var(--primary-blue)"
    }}
  >
  </footer>
);

export default function Footer() {
    return <Footer_Primary />;
};