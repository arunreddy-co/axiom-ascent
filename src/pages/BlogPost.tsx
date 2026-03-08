import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { useState, useEffect } from "react";
import SEO from "@/components/SEO";

const POST_SEO: Record<string, { title: string; description: string; keywords: string }> = {
  "wasting-6-hours-every-day": {
    title: "You Are Wasting 6 Hours Every Day | Automation Workflows",
    description: "70% of business leaders waste up to 3 hours daily on repetitive tasks. Learn what workflow automation is, why it matters, and how to start in 20 minutes.",
    keywords: "workflow automation, business automation, repetitive tasks, automation for beginners",
  },
  "5-processes-to-automate": {
    title: "5 Business Processes You Should Already Be Automating | Automation Workflows",
    description: "Lead follow-up, onboarding, invoicing, reporting, and customer communication — the five workflow categories where manual work costs businesses the most.",
    keywords: "business process automation, automate lead follow-up, invoice automation, onboarding automation",
  },
  "automation-thinking-problem": {
    title: "Automation Is a Thinking Problem, Not a Technology Problem | Automation Workflows",
    description: "The most common reason automations fail has nothing to do with the tool. Learn the five questions to ask before building any workflow — and the three tiers of automation maturity.",
    keywords: "automation strategy, workflow design, how to automate business processes, automation mindset",
  },
  "trigger-based-workflow-architecture": {
    title: "How Trigger-Based Workflow Architecture Works | Automation Workflows",
    description: "A complete guide to the four trigger types — event, schedule, webhook, and manual — and how to configure them for reliable production workflows.",
    keywords: "workflow triggers, webhook trigger, automation architecture, n8n triggers, Make.com triggers",
  },
  "conditional-logic-branching": {
    title: "Conditional Logic in Workflows: If/Then/Else Branching Guide | Automation Workflows",
    description: "Learn how to build if/else conditions, multi-path routers, nested branching, and error branches that make your automations handle real-world complexity.",
    keywords: "conditional logic automation, workflow branching, if else workflow, n8n conditional, Make.com router",
  },
  "error-handling-monitoring-maintenance": {
    title: "Workflow Error Handling, Monitoring and Maintenance Guide | Automation Workflows",
    description: "Most automation guides skip this part. Learn why workflows break in production, how to build proper error handling, what to log, and how to maintain workflows long-term.",
    keywords: "workflow error handling, automation monitoring, workflow maintenance, automation logging",
  },
};

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

.reading-progress {
  position: fixed; top: 0; left: 0; height: 3px; z-index: 200;
  background: linear-gradient(90deg, var(--cyan), var(--purple));
  transition: width 50ms linear;
}

.post-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 68px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  background: rgba(11,15,25,.96); backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border);
}
.post-nav-logo {
  display: flex; align-items: center; gap: 10px; text-decoration: none;
}
.post-nav-logo .dot {
  width: 10px; height: 10px; border-radius: 50%; background: var(--cyan);
  animation: blink 2s ease infinite; flex-shrink: 0;
}
.post-nav-logo span {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 18px;
  color: var(--white); letter-spacing: 4px;
}
.post-nav-links {
  display: flex; align-items: center; gap: 36px; list-style: none;
}
.post-nav-links a {
  color: var(--text); text-decoration: none; font-size: 15px; font-weight: 500;
  transition: color .2s ease;
}
.post-nav-links a:hover { color: var(--cyan); }

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.post-page {
  min-height: 100vh;
  padding: 120px 40px 80px;
  max-width: 680px;
  margin: 0 auto;
}

.post-back {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--cyan); text-decoration: none; font-size: 15px; font-weight: 600;
  margin-bottom: 40px; transition: opacity .2s;
}
.post-back:hover { opacity: .8; }

.post-meta {
  display: flex; align-items: center; gap: 16px; margin-bottom: 20px;
}
.post-tag {
  display: inline-block; padding: 4px 14px; border-radius: 20px;
  font-size: 12px; font-weight: 600;
}
.post-tag.beginner { background: rgba(0,229,255,.12); color: var(--cyan); }
.post-tag.technical { background: rgba(139,92,246,.15); color: var(--purple); }
.post-cat {
  font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted);
}
.post-time {
  font-family: 'Space Mono', monospace; font-size: 12px; color: var(--muted);
  display: flex; align-items: center; gap: 6px;
}

.post-title {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 36px;
  color: var(--white); line-height: 1.15; margin-bottom: 40px;
}

.post-content {
  font-size: 17px; color: var(--text); line-height: 1.85;
}
.post-content h2 {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 22px;
  color: var(--white); margin-top: 48px; margin-bottom: 20px; line-height: 1.3;
}
.post-content h3 {
  font-family: 'Syncopate', sans-serif; font-weight: 700; font-size: 17px;
  color: var(--white); margin-top: 36px; margin-bottom: 14px; line-height: 1.3;
}
.post-content p {
  margin-bottom: 20px;
}
.post-content strong {
  color: var(--white); font-weight: 600;
}
.post-content ul, .post-content ol {
  margin-bottom: 20px; padding-left: 24px;
}
.post-content li {
  margin-bottom: 8px;
}
.post-content code {
  font-family: 'Space Mono', monospace; font-size: 14px;
  background: rgba(0,229,255,.08); color: var(--cyan);
  padding: 2px 8px; border-radius: 6px;
}
.post-content blockquote {
  border-left: 3px solid var(--cyan); padding-left: 20px;
  margin: 24px 0; color: var(--muted); font-style: italic;
}

.post-divider {
  height: 1px; background: var(--border); margin: 56px 0;
}

.post-footer {
  text-align: center;
}
.post-footer a {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--cyan); text-decoration: none; font-size: 15px; font-weight: 600;
  transition: opacity .2s;
}
.post-footer a:hover { opacity: .8; }

@media (max-width: 767px) {
  .post-page { padding: 100px 20px 60px; }
  .post-nav { padding: 0 20px; }
  .post-nav-links { display: none; }
  .post-title { font-size: 24px; }
  .post-content h2 { font-size: 18px; }
  .post-content h3 { font-size: 15px; }
}
`;

function parseMarkdown(md: string): string {
  let html = md
    // headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // paragraphs
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';
      if (block.startsWith('<h2>') || block.startsWith('<h3>')) return block;
      if (block.includes('<li>')) return `<ul>${block}</ul>`;
      if (block.startsWith('<')) return block;
      return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');
  return html;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const seo = POST_SEO[post.slug];

  return (
    <>
      {seo && (
        <SEO
          title={seo.title}
          description={seo.description}
          keywords={seo.keywords}
          canonical={`https://axiom-systems.netlify.app/blog/${post.slug}`}
        />
      )}
      <style>{CSS}</style>
      <div className="reading-progress" style={{ width: `${progress}%` }} />

      <nav className="post-nav">
        <Link to="/" className="post-nav-logo">
          <span className="dot" />
          <span>AXIOM</span>
        </Link>
        <ul className="post-nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>

      <article className="post-page">
        <Link to="/blog" className="post-back">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <div className="post-meta">
          <span className={`post-tag ${post.category.toLowerCase()}`}>
            {post.category}
          </span>
          <span className="post-cat">{post.categoryLabel}</span>
          <span className="post-time">
            <Clock size={13} /> {post.readingTime}
          </span>
        </div>

        <h1 className="post-title">{post.title}</h1>

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        <div className="post-divider" />
        <div className="post-footer">
          <Link to="/blog">
            <ArrowLeft size={16} /> Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
