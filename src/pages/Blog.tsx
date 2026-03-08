import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import SEO from "@/components/SEO";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Mono:wght@400;700&display=swap');

:root {
  --bg: #0B0F19;
  --card: #131A2A;
  --border: #1E293B;
  --text: #E5E7EB;
  --white: #FFFFFF;
  --cyan: #00E5FF;
  --purple: #8B5CF6;
  --muted: #6B7280;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.blog-page {
  min-height: 100vh;
  padding: 120px 40px 80px;
  max-width: 1100px;
  margin: 0 auto;
}

.blog-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  background: rgba(11,15,25,.96); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.blog-nav-logo {
  display: flex; align-items: center; gap: 10px; text-decoration: none;
}
.blog-nav-logo .dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--cyan);
  animation: blink 2s ease infinite; flex-shrink: 0;
}
.blog-nav-logo span {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 18px;
  color: var(--white); letter-spacing: 4px;
}
.blog-nav-links {
  display: flex; align-items: center; gap: 36px; list-style: none;
}
.blog-nav-links a {
  color: var(--text); text-decoration: none; font-size: 15px; font-weight: 500;
  transition: color .2s ease;
}
.blog-nav-links a:hover { color: var(--cyan); }
.blog-nav-links a.active { color: var(--cyan); }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.blog-header { text-align: center; margin-bottom: 64px; }
.blog-header .tag {
  display: inline-block; background: rgba(0,229,255,.1); color: var(--cyan);
  padding: 4px 14px; border-radius: 20px; font-size: 13px; font-weight: 600;
  margin-bottom: 20px;
}
.blog-header h1 {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 42px;
  color: var(--white); line-height: 1.15; margin-bottom: 16px;
}
.blog-header p {
  font-size: 19px; color: var(--muted); max-width: 560px; margin: 0 auto;
}

.blog-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}

.blog-card {
  background: var(--card); border: 1px solid var(--border);
  border-radius: 16px; padding: 32px; position: relative; overflow: hidden;
  transition: transform .3s ease, box-shadow .3s ease;
  text-decoration: none; display: flex; flex-direction: column;
}
.blog-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  opacity: 0; transition: opacity .3s ease;
}
.blog-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px rgba(0,0,0,.45); }
.blog-card:hover::before { opacity: 1; }

.blog-card-meta {
  display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
}
.blog-card-tag {
  display: inline-block; padding: 3px 12px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
}
.blog-card-tag.beginner {
  background: rgba(0,229,255,.12); color: var(--cyan);
}
.blog-card-tag.technical {
  background: rgba(139,92,246,.15); color: var(--purple);
}
.blog-card-time {
  font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted);
  display: flex; align-items: center; gap: 6px;
}

.blog-card-title {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 18px;
  color: var(--white); line-height: 1.3; margin-bottom: 14px; flex: 1;
}

.blog-card-excerpt {
  font-size: 15px; color: var(--muted); line-height: 1.6; margin-bottom: 20px;
}

.blog-card-link {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 14px; font-weight: 600; color: var(--cyan);
  margin-top: auto;
}

@media (max-width: 767px) {
  .blog-page { padding: 100px 20px 60px; }
  .blog-nav { padding: 0 20px; }
  .blog-nav-links { display: none; }
  .blog-header h1 { font-size: 28px; }
  .blog-grid { grid-template-columns: 1fr; }
  .blog-card-title { font-size: 16px; }
}
`;

const Blog = () => {
  return (
    <>
      <SEO
        title="Automation Workflow Blog — Guides for Beginners and Builders"
        description="Practical guides on workflow automation — from why it matters to how triggers, conditional logic, and error handling actually work. No fluff, no hype."
        canonical="https://axiom-systems.netlify.app/blog"
        ogType="website"
      />
      <style>{CSS}</style>
      <nav className="blog-nav">
        <Link to="/" className="blog-nav-logo">
          <span className="dot" />
          <span>AXIOM</span>
        </Link>
        <ul className="blog-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog" className="active">Blog</Link></li>
        </ul>
      </nav>

      <div className="blog-page">
        <div className="blog-header">
          <span className="tag">Knowledge Base</span>
          <h1>Automation Insights</h1>
          <p>Practical guides on workflow automation — from first principles to production-grade systems.</p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <span className={`blog-card-tag ${post.category.toLowerCase()}`}>
                  {post.category}
                </span>
                <span className="blog-card-time">
                  <Clock size={13} />
                  {post.readingTime}
                </span>
              </div>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-excerpt">{post.excerpt}</div>
              <span className="blog-card-link">
                Read article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
