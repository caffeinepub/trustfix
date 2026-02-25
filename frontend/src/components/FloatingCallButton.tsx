export default function FloatingCallButton() {
  const handleClick = () => {
    window.open('https://wa.me/918884447229', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Call us on WhatsApp"
      style={{
        position: 'fixed',
        left: '18px',
        bottom: '90px',
        zIndex: 9999,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        backgroundColor: '#25D366',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px rgba(37,211,102,0.45)',
      }}
      className="hover:scale-110 transition-transform duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        width="26"
        height="26"
      >
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    </button>
  );
}
