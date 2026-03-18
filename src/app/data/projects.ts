// ─── Edit all project content here ────────────────────────────────────────────
//
//   summary        — description shown at the top of the card
//   sidebar        — text for the four expandable left-nav sections
//   contributions  — work items, each with:
//       title          — bold heading (also triggers hover image if hoverImage is set)
//       description    — short line shown in collapsed state
//       hoverImage     — (optional) image/mp4 shown behind text on hover
//       expandedText   — paragraph shown when card is expanded (\n for line breaks)
//       expandedImages — (optional) up to two media items: { src, caption }

export interface ExpandedImage {
  src: string;
  caption: string;
}

// Summary supports mixed plain text and inline links:
// summary: ["Some text ", { text: "link label", url: "https://..." }, " more text"]
export type SummarySegment = string | { text: string; url: string };

export interface Contribution {
  title: string;
  description: string;
  hoverImage?: string;
  expandedText: string;
  expandedImages?:
    | [ExpandedImage]
    | [ExpandedImage, ExpandedImage]
    | [ExpandedImage, ExpandedImage, ExpandedImage];
}

export interface Sidebar {
  problem: string;
  why: string;
  proposal: string;
  outcome: string;
}

export interface Project {
  id: string;
  label: string;
  summary: SummarySegment[];
  sidebar: Sidebar;
  contributions: Contribution[];
}

export const PROJECTS: Project[] = [
  {
    id: "presence-ai",
    label: "Presence AI",
    summary: [
      "Led everything design for the consumer-facing realtime avatar.\n \n Company goal: 500K-1M MAU + 20% of user in session for 5min and 10% for 10min",
    ],
    sidebar: {
      problem:
        "How do we elevate human and AI conversation? What other formats or cadence of conversation can we have with AI?",
      why: "The conversational space is mostly saturated by text-based interactions",
      proposal:
        "Multimodal consumer-facing live digital avatar application (generative video + audio)",
      outcome:
        "product validation resulting in a coded prototype with 4K DAU before sunsetting. Ultimately, the experiment showed: casino behavior, high cost per avatar, and technical requirements",
    },
    contributions: [
      {
        title: "Landing page interaction",
        description: "Proof of concept application with 4K DAU reached",
        hoverImage: "/images/presence/landing-site.jpg",
        expandedText:
          "1. Roulette interaction: 67% user start call (+13% from single) but only 0.3% next day retention rate.\n 2. Creation: only 18.97% desktop user complete flow vs. 8% mobile BUT first time seeing organic retention (eg. 200 return users in one day) ",
        expandedImages: [
          {
            src: "/images/presence/landing-site1.jpg",
            caption: "Roulette interaction (randomized avatars)",
          },
          {
            src: "/images/presence/landing-site2.mp4",
            caption: "Creation (letting user create)",
          },
        ],
      },
      {
        title: "Building for speed",
        description:
          "Defined design system for team to push to production every 2 weeks to get real user feedbacks",
        hoverImage: "/images/presence/design-system.mp4",
        expandedText:
          "Want to find product use cases and create a MVP to gauge market opportunity",
        expandedImages: [
          {
            src: "/images/presence/design-system1.jpg",
            caption: "flexible design system",
          },
          {
            src: "/images/presence/design-system2.jpg",
            caption:
              "Keep the system in alignment with Engineer's component codebase",
          },
        ],
      },
      {
        title: "Prompting language",
        description:
          "I guided prompting for avatar and asset generation by creating a taxonomy of art style and genre to bring a common product language and team alignment",
        hoverImage: "/images/presence/prompting.mp4",
        expandedText:
          "This resulted in: \n Backend tagging system for metadata, front-end filtering feature for user, internal platform for the team to auto-generate avatars (tied together video, voice and image generations from different APIs",
        expandedImages: [
          { src: "/images/presence/prompting1.jpg", caption: "Taxonomy guide" },
          {
            src: "/images/presence/prompting2.jpg",
            caption:
              "bring language to our backend system prompting for video and image generation",
          },
        ],
      },
      {
        title: "Conversation interface",
        description:
          "Designed a conversation interface flow that reached 14% 5min mobile session vs. 23% desktop",
        hoverImage: "/images/presence/convo-ui.mp4",
        expandedText:
          "Working with various techcial limitations and designing a interface focused on user creation \n Based on 350 sample users, 82% reach 10m on desktop vs. 42% on mobile \n To reduce cost, the product shifted from video to text and voice with generation features in text mode (5s video: $0.75 per and 10s video $1.5 at 6 video per person average vs. $0.08 per image) ",
        expandedImages: [
          {
            src: "/images/presence/convo-ui1.mp4",
            caption:
              "Tech limitation: Avatar's audio status is hard to assess \n → Design solution: Voice indicator to give visue cues and for team to debug more easily",
          },
          {
            src: "/images/presence/convo-ui2.mp4",
            caption:
              "Tech limitation: Lipsync is not perfect and video mode cost a lot  \n → Design solution: Emphasize text and audio mode",
          },
        ],
      },
    ],
  },
  {
    id: "headroom",
    label: "Headroom",
    summary: [
      {
        text: "Acquired",
        url: "https://investors.upwork.com/news-releases/news-release-details/upwork-reports-fourth-quarter-and-full-year-2023-financial",
      },
      " by Upwork in November 2023. \n \n As the sole and lead designer on the team, I facilitated collaboration between Heads of Product, Engineering, and Marketing on a platform that makes it easy to leverage multimodal AI to create collaborative experiences",
    ],

    sidebar: {
      problem: "How do we help people collaborate more easily?",
      why: "The pandemic has fast track remote collaboration and people are spending more time in meetings trying to take notes than being present",
      proposal:
        "AI-powered collaboration with capabilities like summaries, replay, highlight, auto transcripts, action items and search",
      outcome:
        "Collaboration with Lucidspark lauched July 2023. Developer platform pivotted in 3 months, acquired by Upwork November 29 2023",
    },
    contributions: [
      {
        title: "SDK developer tool",
        description:
          "Designed a SDK tool to showcase Headroom's AI capabilities and streamline to teams though an API",
        hoverImage: "/images/headroom/sdk-tool.jpg",
        expandedText:
          "Even though the product is a developer tool, I designed the interface to be friendly for both technical and non-technical audiences",
        expandedImages: [
          { src: "/images/headroom/sdk1.mp4", caption: "Dashboard overview" },
          {
            src: "/images/headroom/sdk2.mp4",
            caption: "Playground (sessions based on room ID",
          },
          {
            src: "/images/headroom/sdk3.mp4",
            caption:
              "Pricing calculator to gauge billing based on credit usages",
          },
        ],
      },
      {
        title: "Lucidspark extension",
        description:
          "Led design on a B2B opportunity to integrate Headroom's AI collaborative capabilities for virtual meetings into Lucid's whiteboard application",
        hoverImage: "/images/headroom/lucid-spark.jpg",
        expandedText:
          "Designed within limited vertical panel window, and within Lucid's architecture and backend",
        expandedImages: [
          {
            src: "/images/headroom/lucid1.jpg",
            caption:
              "Distilled core values of Headroom into features for the extension through new components and UI",
          },
          {
            src: "/images/headroom/lucid2.mp4",
            caption:
              "Based on Lucid's backend architecture, we came up with a feature to copy a summary card of the meeting right into the board",
          },
        ],
      },
      {
        title: "The Headroom brand",
        description:
          "Established the brand through design system, marketing materials, and product interface",
        hoverImage: "/images/headroom/headroom.jpg",
        expandedText:
          "Responsible for integrated brand identity into Webflow for seamless marketing alignment and throughout different touchpoints in the product and company operation",
        expandedImages: [
          {
            src: "/images/headroom/headroom1.jpg",
            caption:
              "I shaped the design system, typography, and visual language (inspired by retro delight 👾)",
          },
          {
            src: "/images/headroom/headroom2.jpg",
            caption:
              "Designed website for SEO discovery and outreach to B2B partners",
          },
        ],
      },
    ],
  },
  {
    id: "grand-theft-auto",
    label: "Grand Theft Auto",
    summary: [
      "Defined interactions for the web-based application, ",
      {
        text: "License Plate Creator",
        url: "https://www.rockstargames.com/gta-online/license-plates",
      },
      ", that lets player personalize in-game plates out-of-console \n \n Part of the innovation Marketing team on a design team of 3. Defined the majority of application interface and interaction; built off GTA's main design system",
    ],
    sidebar: {
      problem:
        "The 2013 companion app, iFruit, which lets user enjoy in-game contents out of console, has 2.2 stars rating/400K reviews and buggy. How can we make it better?",
      why: "There are over 100 million players and over 740 vehicles in the game. UXR showed vehicles as a valuable touchpoint for personalization",
      proposal:
        "A companion experience on the browser where users can create their license plate",
      outcome:
        "The License Plate Creator was launched in 2023 to over 15 million players and received positive feedbacks",
    },
    contributions: [
      {
        title: "Story-driven UX",
        description:
          "Crafted a narrative flow that supported over 15 million player from console to web",
        hoverImage: "/images/gta/gta.mp4",
        expandedText:
          "Storytelling is a major aspect of GTA brand identity and component of user retention. \n Technical constraints: hosting large 3D assets can make Canvas rendering laggy which interrupts the storytelling flow \n Design solution: I found a solution through a two column system in which the canvas and panel slides (to tell the story) throughout the creation process and only have to render once in the beginning",
        expandedImages: [
          {
            src: "/images/gta/gta1.mp4",
            caption:
              "I crafted the experience flow to feel seamless, paying particular attention to the transition motion design",
          },
          {
            src: "/images/gta/gta2.jpg",
            caption:
              "Drew on the branding of Los Santos (console in-game Auto Shop, the narrative on the web is player moving into an auto shop, creating their plate, and leaving the shop.",
          },
        ],
      },
      {
        title: "User-centric states",
        description:
          "Mapped out states and design for a seamless player experience.",
        hoverImage: "/images/gta/gta-states.jpg",
        expandedText:
          "I designed with the mindset of addressing each user states with care. A huge push was to give guest players the ability to demo the application first before prompting account creation (buld trust)",
        expandedImages: [
          {
            src: "/images/gta/gta-states1.jpg",
            caption:
              "Guest player upon trying, plate in the background update to show preview",
          },
          {
            src: "/images/gta/gta-states2.jpg",
            caption:
              "Account player first time: sample plate as zero state + CTA to create plate .",
          },
          {
            src: "/images/gta/gta-states3.jpg",
            caption:
              "Account player who has created a plate, call to action to pick up plate in-game",
          },
        ],
      },
      {
        title: "Copywriting as education",
        description:
          "Championed for clarity and transparency in the overall experience through UI copy",
        hoverImage: "/images/gta/gta-copy.mp4",
        expandedText:
          "Infering directions and dependencies through copies \n While working on this project, I recognized the subtle distinction that UI and UX can guide, but copies can tell it straight \n I did all my mocks with realistic writing and insert as much instructional and contextual tones whenever possible \n We were working with limited API metadata, I want to be help players understand (remove tension) the invisible dependencies between web and console",
        expandedImages: [
          {
            src: "/images/gta/gta-copy1.mp4",
            caption:
              "Limitation: player has to go in game to claim their created plate before they can create another one",
          },
        ],
      },
    ],
  },
  {
    id: "museum-of-arts-and-design",
    label: "Museum of Arts & Design",
    summary: [
      "As the studio's first product designer, I co-created directly with the Director of Emerging Technology to craft a ",
      {
        text: "digital exhibition",
        url: "https://madmuseum.org/burke-prize-2021/",
      },
      " for the Burke Prize 2021 biannual contemporary art prize, focused on accessibility and showcased artists' work in narrative form",
    ],
    sidebar: {
      problem:
        "The exhibition normally takes place onsite at New York, but due to Covid, had to be remote",
      why: "The Burke Prize, an biannual award given to a U.S.-based artist age 45 or under, and works in the expansive fields of glass, fiber, clay, metal, or wood",
      proposal:
        "A digital exhibition introducing award-nominated artists and their work",
      outcome:
        "Launched 2022 🚀, won Museum Association of NY's 2022 Awards of Merit for Excellence in Design and shortlisted for Best Digital Product Innovation for the Digiday Media Awards",
    },
    contributions: [
      {
        title: "Architectured artist information",
        description: "Structured 14 unique artist data into a navigable system",
        hoverImage: "/images/mad/mad.jpg",
        expandedText:
          "Coming into the project was the question: 'How do we represent what was normally live in digital form?'",
        expandedImages: [
          {
            src: "/images/mad/mad1.jpg",
            caption:
              "Taking stock of the 14 unique artists who have varied mediums and statements for who they are (sculpture is a very physical material)",
          },
          {
            src: "/images/mad/mad2.jpg",
            caption:
              "I composed a system for how we can organize and structure all the artifacts",
          },
          {
            src: "/images/mad/mad3.jpg",
            caption:
              "Based on the system, I came up with media categories and designed unique components",
          },
        ],
      },
      {
        title: "Elements of storytelling",
        description:
          "Wove curatorial narrative through interactive moments to introudce the site to visitors",
        hoverImage: "/images/mad/mad-story.jpg",
        expandedText:
          "Two comments from the museum lead the storytelling direction I went on to define: \n MAD's curations of the exhibition evoke sense of participation over possession \n \n Craft is a journey, so the time and labor are as much part of the process as the finished pieces \n I also used my own handwriting for the organic fonts and elements",
        expandedImages: [
          {
            src: "/images/mad/mad-story1.jpg",
            caption:
              "My guidance of the interaction system were: sense of museum goer participation and the organic process that craft embodies",
          },
          {
            src: "/images/mad/mad-story2.mp4",
            caption:
              "I storyboarded an interaction for the hero welcome that gave context to the exhibition and as visitors hovered over dots, there is a reveal of an artist's work.",
          },
        ],
      },
      {
        title: "Website design",
        description:
          "Defined a narrative-first and hands-on interaction system and visual language",
        hoverImage: "/images/mad/mad-web.jpg",
        expandedText:
          "I worked directly with the Engineer and Design Director on implementation of the site with focus on accessibility, assets hosting, links, and components",
        expandedImages: [
          {
            src: "/images/mad/mad-web1.mp4",
            caption:
              "Special animation and interaction to infused as much hands-on and organic elements as I can",
          },
          {
            src: "/images/mad/mad-web2.jpg",
            caption:
              "I created a set of design and visual systems specific to each of the media types",
          },
        ],
      },
    ],
  },
  {
    id: "socratic",
    label: "Socratic",
    summary: [
      "Rebranding the AI-powered app, Socratic, to help students with their homework by providing educational resources like videos, definitions, Q&A, links and more \n \n 2019 launch covered by ",
      {
        text: "Google's blog",
        url: "https://blog.google/products-and-platforms/products/education/socratic-by-google/#:~:text=To%20help%20students%20working%20on,them%20work%20through%20their%20questions.",
      },
      " and ",
      {
        text: "TIME",
        url: "https://time.com/4650119/socratic-app-homework-iphone/",
      },
      "",
    ],
    sidebar: {
      problem:
        "Regular Google search can be daunting for younger learners and Google just acquired an AI educational app called Socratic",
      why: "The app use a combination of OCR, AI and machine learning to surface relevant learning resources (eg. websites, videos, links) for students",
      proposal:
        "Rebrand the app as a learning-focused search by Google to be ready for back to school for fall",
      outcome:
        "Launched: August 2019. 4.9 ⭐️ on app store. Daily active users from 120K in Sept. 2019 to 750K in April 2020 (+525%). Sunsetted: October 2024",
    },
    contributions: [
      {
        title: "Established visual styleguide",
        description:
          "I defined the new visual system and guidelines for the rebrand",
        hoverImage: "/images/socratic/socratic.jpg",
        expandedText:
          "Rebrand the app to feel Googley and fun; make the new app feel like part of Google's product ecosystem \n Ensured the system is scaleable, Paired graphic and text concepts across learning content",
        expandedImages: [
          {
            src: "/images/socratic/socratic1.jpg",
            caption:
              "I came up with a graphic style based on fidelity and delightful for Gen Z and Alpha audiences",
          },
          {
            src: "/images/socratic/socratic2.mp4",
            caption:
              "I created a brand new custom font within 2 weeks to be used for content creation so the team have full control of characters and symbols to build with",
          },
          {
            src: "/images/socratic/socratic3.jpg",
            caption:
              "Created a complimentary theme for Socratic from Google Material's color guideline",
          },
        ],
      },
      {
        title: "Storytelling with logo",
        description: "I redesigned the logo to have more brand presence",
        hoverImage: "/images/socratic/logo.mp4",
        expandedText:
          "Rebooted the logo and brought that into product messaging and moments of delight",
        expandedImages: [
          {
            src: "/images/socratic/logo1.jpg",
            caption:
              "Full range of characters and strengthen brand association",
          },
          {
            src: "/images/socratic/logo2.mp4",
            caption:
              "Designed short animations and motion guideline for how the logo would move",
          },
        ],
      },
      {
        title: "First-party content creation",
        description:
          "I collaborated with the pedagogy team and led the creation of over 900 original content cards",
        hoverImage: "/images/socratic/socratic-content.jpg",
        expandedText:
          "Led another visual designer and worked directly worked with pedagogy experts on first party content creation. In the span of 4 months, we created over 900 explainer cards across subjects like math, science, physics, biology, and history. 30-40% of usage surfaced a explainer card.",
        expandedImages: [
          {
            src: "/images/socratic/socratic-content1.jpg",
            caption: "Tight loop of create, review, and QA testing",
          },
          {
            src: "/images/socratic/socratic-content2.jpg",
            caption:
              "Designed for readability and understandability on vertical mobile space",
          },
          {
            src: "/images/socratic/socratic-content3.mp4",
            caption: "Snippet of final product",
          },
        ],
      },
      {
        title: "Custom math keyboard",
        description: "Cross-team collaborated on Google’s first math keyboard",
        hoverImage: "/images/socratic/socratic-keyboard.jpg",
        expandedText:
          "Socratic & Lens are both Google products that use cameras as a main source of input. Sometimes, the OCR technology would fail. This causes users to get stuck in their end-to-end journey or experience bad query results. \n Led design work creating a custom math keyboard so that users can manually address OCR errors. Collaborated cross-functionally for alignments between the two teams.",
        expandedImages: [
          {
            src: "/images/socratic/socratic-keyboard1.mp4",
            caption:
              "Adoption into Google Seach (eg. search math solver) in 2025",
          },
          {
            src: "/images/socratic/socratic-keyboard2.mp4",
            caption:
              "Closely collaborated with engineering to implements and troubleshoot functionality (eg. LaTex font) and UXR team to guide design interactions (eg. cursor UX)",
          },
          {
            src: "/images/socratic/socratic-keyboard3.jpg",
            caption: "Snippet of final feature released on Lens in 2020",
          },
        ],
      },
    ],
  },
];

export const SIDEBAR_ITEMS = ["problem", "why", "proposal", "outcome"] as const;
