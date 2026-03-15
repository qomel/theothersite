export default function Footer() {
  return (
    <div
      className="footer-wrap relative"
      style={{
        paddingLeft: "48px",
        paddingRight: "48px",
        paddingBottom: 0,
        background: "#260009",
        zIndex: 1,
      }}
    >
      <footer
        className="footer-inner"
        style={{
          background: "#fcf5e5",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          paddingLeft: "72px",
          paddingRight: "72px",
          paddingTop: "64px",
          paddingBottom: "48px",
        }}
      >
        {/* Top row: logo + tagline */}
        <div
          className="footer-top flex flex-col sm:flex-row justify-between items-start sm:items-baseline"
          style={{ marginBottom: "56px", gap: "12px" }}
        >
          <span
            className="footer-logo"
            style={{
              fontFamily: "var(--italiana, serif)",
              fontSize: "48px",
              fontWeight: 400,
              letterSpacing: "0.03em",
              color: "rgba(38,0,9,0.85)",
              lineHeight: 1,
            }}
          >
            THEOTHERSITE
          </span>

          <span
            className="footer-tagline"
            style={{
              fontFamily: "var(--dm, sans-serif)",
              fontSize: "14px",
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "rgba(38,0,9,0.65)",
            }}
          >
            Built with passion.
          </span>
        </div>

        {/* Mid row: contact + socials */}
        <div
          className="footer-mid flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8 pb-12 mb-8"
          style={{
            borderBottom: "1px solid rgba(38,0,9,0.12)",
          }}
        >
          {/* Contact */}
          <div className="footer-contact">
            <p
              className="footer-label"
              style={{
                fontFamily: "var(--dm, sans-serif)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(38,0,9,0.6)",
                marginBottom: "10px",
                margin: "0 0 10px 0",
              }}
            >
              Get in touch
            </p>
            <a
              href="mailto:hello@theothersite.pl"
              className="footer-email"
              style={{
                fontFamily: "var(--cormorant, serif)",
                fontStyle: "italic",
                fontSize: "28px",
                fontWeight: 400,
                color: "rgba(38,0,9,0.85)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                display: "inline-block",
              }}
            >
              hello@theothersite.pl
            </a>
          </div>

          {/* Socials */}
          <div
            className="footer-socials flex gap-6"
          >
            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link flex items-center gap-2"
              style={{
                fontFamily: "var(--dm, sans-serif)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(38,0,9,0.7)",
                textDecoration: "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
              GitHub
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link flex items-center gap-2"
              style={{
                fontFamily: "var(--dm, sans-serif)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(38,0,9,0.7)",
                textDecoration: "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom row: coords + copyright */}
        <div className="footer-bottom flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span
            className="footer-coords"
            style={{
              fontFamily: "var(--dm, sans-serif)",
              fontSize: "12px",
              fontWeight: 300,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(38,0,9,0.55)",
            }}
          >
            50°17′32″N 18°40′02″E
          </span>

          <span
            className="footer-copy"
            style={{
              fontFamily: "var(--dm, sans-serif)",
              fontSize: "12px",
              fontWeight: 300,
              letterSpacing: "0.02em",
              color: "rgba(38,0,9,0.55)",
            }}
          >
            © 2026 Dominik Pazurek
          </span>
        </div>
      </footer>
    </div>
  );
}
