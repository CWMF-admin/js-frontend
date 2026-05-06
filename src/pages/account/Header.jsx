const Header_Primary = () => (
  <footer
    style={{
      backgroundColor: "var(--primary-blue)",
      borderTop: "2px solid var(--primary-blue)",
      position: "fixed",
      width: "100%",
      left: 0,
      height: "120px",
      top: 0,
      color: "var(--primary-blue)"
    }}
  >
  </footer>
);

export default function Header() {
    return <Header_Primary />;
};