import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Send, X } from 'lucide-react';
import { projectData } from '../data/projectData';

const fallbackText = "I don’t see that information in Kimmie’s portfolio yet.";

const starterPrompts = [
  "What kind of work has Kimmie done?",
  "Which projects are most relevant for growth marketing?",
  "What experience does she have in Web3?",
  "Which case study should I read first?",
  "How can I contact her?"
];

function normalize(text = '') {
  return text.toLowerCase().trim();
}

function projectLink(slug, label) {
  return { href: `/project/${slug}`, label };
}

function getAnswer(question, projects) {
  const q = normalize(question);
  if (!q) return { text: fallbackText };

  const ancient8 = projects.find((p) => p.slug === 'ancient8');
  const gmVietnam = projects.find((p) => p.slug === 'gm-vietnam');
  const space3 = projects.find((p) => p.slug === 'space3');
  const kyros = projects.find((p) => p.slug === 'kyros-ventures');
  const lilquid = projects.find((p) => p.slug === 'lilquid-nft');
  const arkai = projects.find((p) => p.slug === 'arkai-nft');

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    return {
      text: "You can contact Kimmie via email at huynhboikim2809@gmail.com or phone +84 938 556 225. The contact section is at the bottom of the homepage.",
      links: [{ href: '/#contact', label: 'Go to Contact section' }]
    };
  }

  if (q.includes('who') || q.includes('background') || q.includes('work has kimmie done') || q.includes('about kimmie')) {
    return {
      text: "Kimmie is a Growth Marketing Manager focused on Web3 ecosystems. Her portfolio highlights end-to-end growth work across Layer2, venture ecosystems, gaming, NFTs, and blockchain conferences, including projects like GM Vietnam, Ancient8, Space3, Kyros Ventures, Lilquid NFT, and Arkai.",
      links: [
        { href: '/#about', label: 'View My Journey' },
        { href: '/#projects', label: 'View Case Studies' }
      ]
    };
  }

  if (q.includes('web3')) {
    return {
      text: "Kimmie’s Web3 experience in this portfolio spans growth strategy, ecosystem partnerships, campaign execution, and community scaling across conferences, Layer2 ecosystems, gaming platforms, venture studio work, and NFT projects.",
      links: [
        projectLink('gm-vietnam', 'GM Vietnam'),
        projectLink('ancient8', 'Ancient8'),
        projectLink('space3', 'Space3')
      ]
    };
  }

  if (q.includes('growth marketing') || q.includes('growth')) {
    return {
      text: "For growth marketing, the strongest case studies to start with are GM Vietnam (registration and ecosystem distribution), Ancient8 (ecosystem growth and incentive campaigns), and Space3 (user onboarding and gaming ecosystem campaigns).",
      links: [
        projectLink('gm-vietnam', 'Read GM Vietnam'),
        projectLink('ancient8', 'Read Ancient8'),
        projectLink('space3', 'Read Space3')
      ]
    };
  }

  if (q.includes('which case study') || q.includes('read first') || q.includes('start with')) {
    return {
      text: "A good starting order is GM Vietnam for large-scale campaign execution, then Ancient8 for on-chain ecosystem growth, then Kyros Ventures for SEA market-entry and partnership work.",
      links: [
        projectLink('gm-vietnam', 'Start with GM Vietnam'),
        projectLink('ancient8', 'Then Ancient8'),
        projectLink('kyros-ventures', 'Then Kyros Ventures')
      ]
    };
  }

  if (q.includes('ancient8')) {
    if (!ancient8) return { text: fallbackText };
    return {
      text: `${ancient8.title} focuses on gaming ecosystem growth and on-chain adoption. In this case study, Kimmie highlights exchange listing campaign support, a retroactive incentive campaign, and creator program expansion.`,
      links: [projectLink('ancient8', 'Open Ancient8 case study')]
    };
  }

  if (q.includes('nft')) {
    return {
      text: "Kimmie’s NFT-focused work in this portfolio includes Lilquid NFT and Arkai, covering launch strategy, campaign production, community growth, KOL onboarding, and ecosystem collaboration.",
      links: [
        projectLink('lilquid-nft', 'Open Lilquid NFT'),
        projectLink('arkai-nft', 'Open Arkai')
      ]
    };
  }

  if (q.includes('partnership') || q.includes('ecosystem')) {
    return {
      text: "Partnership and ecosystem growth are core across multiple case studies, especially Kyros Ventures, Space3, GM Vietnam, and Arkai.",
      links: [
        projectLink('kyros-ventures', 'Kyros Ventures'),
        projectLink('space3', 'Space3'),
        projectLink('arkai-nft', 'Arkai')
      ]
    };
  }

  if (q.includes('skill') || q.includes('expertise') || q.includes('strongest area')) {
    return {
      text: "Based on the Core Expertises section, Kimmie’s strongest areas are: Growth & Performance Marketing, Ecosystem & Partnership Development, and Content & Brand Positioning.",
      links: [{ href: '/#about', label: 'View homepage sections' }]
    };
  }

  if (q.includes('gm vietnam')) {
    return {
      text: "GM Vietnam highlights large-scale conference growth work: campaign execution, KOL/media coordination, and ecosystem-driven distribution.",
      links: [projectLink('gm-vietnam', 'Open GM Vietnam case study')]
    };
  }

  if (q.includes('space3')) {
    return {
      text: "Space3 focuses on user onboarding campaigns and strategic ecosystem partnerships in Web3 gaming, with campaign structures designed for efficient growth.",
      links: [projectLink('space3', 'Open Space3 case study')]
    };
  }

  if (q.includes('kyros')) {
    return {
      text: "Kyros Ventures demonstrates Kimmie’s SEA market-entry and ecosystem marketing execution, including media/branding support, tailored client campaigns, and KOL onboarding.",
      links: [projectLink('kyros-ventures', 'Open Kyros Ventures case study')]
    };
  }

  if (q.includes('arkai')) {
    return {
      text: "Arkai’s case study emphasizes NFT project leadership, ecosystem partnerships, visual campaign execution, and community activation initiatives.",
      links: [projectLink('arkai-nft', 'Open Arkai case study')]
    };
  }

  if (q.includes('lilquid')) {
    return {
      text: "Lilquid NFT shows end-to-end NFT project planning, promotional campaign execution, KOL onboarding, ecosystem collaborations, and measurable trading outcomes.",
      links: [projectLink('lilquid-nft', 'Open Lilquid NFT case study')]
    };
  }

  const projectHit = projects.find((p) => q.includes(normalize(p.title)) || q.includes(normalize(p.slug)));
  if (projectHit) {
    return {
      text: `${projectHit.title}: ${projectHit.shortDescription}`,
      links: [projectLink(projectHit.slug, `Open ${projectHit.title}`)]
    };
  }

  return { text: fallbackText };
}

export default function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi — I’m Kimmie’s AI portfolio assistant. You can ask me about her experience, projects, case studies, and what kind of work she does."
    }
  ]);

  const projects = useMemo(() => projectData, []);

  const sendMessage = (question) => {
    const content = question.trim();
    if (!content) return;

    const userMessage = { role: 'user', text: content };
    const response = getAnswer(content, projects);
    const assistantMessage = { role: 'assistant', text: response.text, links: response.links || [] };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[380px] h-[560px] rounded-3xl border border-white/10 bg-[#0B0B12]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div>
              <p className="text-sm font-semibold text-white">Kimmie AI Assistant</p>
              <p className="text-xs text-[#FFA3BD]">Portfolio guide</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl text-textSecondary hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <X size={16} />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.slice(0, 4).map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-2 rounded-full border border-[#FF7FA6]/40 text-[#FFC1D3] hover:border-[#FF7FA6] hover:text-[#FF7FA6] transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="h-[390px] overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block max-w-[92%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#FF7FA6] text-white'
                      : 'bg-white/[0.05] text-textPrimary border border-white/10'
                  }`}
                >
                  {msg.text}
                </div>

                {msg.role === 'assistant' && Array.isArray(msg.links) && msg.links.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {msg.links.map((item) => (
                      item.href.startsWith('/project/') ? (
                        <div key={`${idx}-${item.href}`}>
                          <Link
                            to={item.href}
                            className="text-xs text-[#FFA3BD] hover:text-[#FF7FA6] underline underline-offset-4"
                          >
                            {item.label}
                          </Link>
                        </div>
                      ) : (
                        <div key={`${idx}-${item.href}`}>
                          <a
                            href={item.href}
                            className="text-xs text-[#FFA3BD] hover:text-[#FF7FA6] underline underline-offset-4"
                          >
                            {item.label}
                          </a>
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-white/10 bg-[#0B0B12]"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, experience, skills..."
                className="flex-1 h-11 rounded-xl bg-white/[0.05] border border-white/10 px-3 text-sm text-textPrimary placeholder:text-textSecondary outline-none focus:border-[#FF7FA6]/70"
              />
              <button
                type="submit"
                className="h-11 w-11 rounded-xl text-white flex items-center justify-center transition-colors"
                style={{ background: 'linear-gradient(90deg,#FFA3BD,#FF7FA6)' }}
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 sm:right-6 z-50 h-14 px-5 rounded-full text-white font-semibold flex items-center gap-2 transition-all hover:brightness-110 shadow-[0_0_24px_rgba(255,127,166,0.35)]"
        style={{ background: 'linear-gradient(90deg,#FFA3BD,#FF7FA6)' }}
      >
        <MessageCircle size={18} />
        Ask Kimmie
      </button>
    </>
  );
}
