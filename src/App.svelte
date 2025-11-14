<script>
  import { onMount } from "svelte";

  let typewriterText = "";
  let recentImages = [];

  const studioData = [
    {
      src: "/studio/blessings (2025)_optimized.webp",
      title: "blessings",
      date: "2025",
    },
    {
      src: "/studio/1000 yards (2025)_optimized.webp",
      title: "1000 yards",
      date: "2025",
    },
    {
      src: "/studio/longing (2022)_optimized.webp",
      title: "longing",
      date: "2022",
    },
    {
      src: "/studio/on your shoulders (2022)_optimized.webp",
      title: "on your shoulders",
      date: "2022",
    },
    {
      src: "/studio/Eli at work (2021)_optimized.webp",
      title: "eli at work",
      date: "2021",
    },
    {
      src: "/studio/mud (2020)_optimized.webp",
      title: "mud",
      date: "2020",
    },
    {
      src: "/studio/bloodlines (2020)_optimized.webp",
      title: "bloodlines",
      date: "2020",
    },
  ];

  onMount(() => {
    // Load studio data
    recentImages = studioData.slice(0, 4);

    // Typewriter effect
    const text = "Sara";
    let i = 0;
    const type = () => {
      if (i < text.length) {
        typewriterText += text.charAt(i);
        i++;
        setTimeout(type, 150);
      }
    };
    setTimeout(type, 200);
  });

  function navigateToStudio() {
    window.location.href = "/studio.html";
  }
</script>

<svelte:head>
  <title>sara chadwick - software engineer</title>
  <meta
    name="description"
    content="sara chadwick - software engineer creating cute stuff"
  />
  <meta name="theme-color" content="#ffb8ad" />

  <!-- Open Graph tags -->
  <meta property="og:title" content="sara chadwick - software engineer" />
  <meta
    property="og:description"
    content="Creating quirky games and web experiences"
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sara-chadwick.com" />
  <meta property="og:image" content="/avatar.jpeg" />

  <!-- Twitter Card tags -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="sara chadwick - software engineer" />
  <meta
    name="twitter:description"
    content="Creating quirky games and web experiences"
  />
  <meta name="twitter:image" content="/avatar.jpeg" />

  <!-- Load studio data -->
  <script src="/studio-data.js"></script>
</svelte:head>

<!-- Floating gradient orbs -->
<div class="gradient-orb gradient-orb-1"></div>
<div class="gradient-orb gradient-orb-2"></div>
<div class="gradient-orb gradient-orb-3"></div>
<div class="gradient-orb gradient-orb-4"></div>

<div class="container">
  <div class="card who-am-i">
    <img alt="Sara Chadwick" class="face" src="/avatar.jpeg" />
    <h1>Sara Chadwick</h1>
    <p>
      Hi I'm {typewriterText}<span class="cursor">|</span>!
    </p>
    <p>This is my website and here is some stuff</p>

    <div class="contact-links">
      <a href="https://github.com/sarachadwick" target="_blank" rel="noopener"
        >github</a
      >
      <a
        href="https://www.linkedin.com/in/sara-chadwick/"
        target="_blank"
        rel="noopener">linkedin</a
      >
      <a href="mailto:sarachadwick92@gmail.com">email</a>
      <a href="/studio.html">studio</a>
    </div>
  </div>

  <div class="column-two">
    <div class="card stuff-i-did">
      <h1>The Stuff</h1>
      <ul class="the-stuff">
        <li>
          <a href="/chicagosugarhigh">Chicago Sugar High</a> - a blog about
          trying baked goods
          <div class="project-desc">
            <span class="tech-stack">(WordPress, Custom Theme)</span>
          </div>
        </li>
        <li>
          <a
            href="https://sarachadwick.github.io/bunbon2/"
            target="_blank"
            rel="noopener">Bunbon</a
          >
          - A clicker game about bunnies and muffins
          <div class="project-desc">
            <span class="tech-stack">(Sveltekit)</span>
          </div>
        </li>
        <li>
          <a
            href="https://github.com/sarachadwick/stellar-connections"
            target="_blank"
            rel="noopener">Stellar Connections</a
          >
          - A game-ified svelte/typescript tutorial
          <div class="project-desc">
            <span class="tech-stack">(Svelte, TypeScript)</span>
          </div>
        </li>
      </ul>
    </div>

    <div class="card recent-studio">
      <h2>Recent Art</h2>
      <div class="recent-images">
        {#if recentImages.length === 0}
          <div class="recent-studio-empty">Studio coming soon!</div>
        {:else}
          {#each recentImages as item}
            <div
              class="recent-image-item"
              role="button"
              tabindex="0"
              aria-label="View {item.title} in studio"
              on:click={navigateToStudio}
              on:keydown={(e) => e.key === "Enter" && navigateToStudio()}
            >
              <img src={item.src} alt={item.title} loading="lazy" />
            </div>
          {/each}
        {/if}
      </div>
      <a href="/studio.html" class="studio-link">View Full Studio →</a>
    </div>
  </div>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    background: linear-gradient(
      135deg,
      #ffb8ad 0%,
      #f96f5d 25%,
      #ffe4b5 50%,
      #ffb8ad 75%,
      #f96f5d 100%
    );
    background-size: 400% 400%;
    animation: gradient-shift 15s ease infinite;
    color: #fbf2c0;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
      Cantarell, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    overflow-x: hidden;
  }

  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Floating gradient orbs */
  .gradient-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    pointer-events: none;
    z-index: 0;
    animation: float 20s ease-in-out infinite;
    will-change: transform;
  }

  .gradient-orb-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(255, 184, 173, 0.8) 0%,
      rgba(249, 111, 93, 0.6) 100%
    );
    top: 10%;
    left: 10%;
    animation-delay: 0s;
  }

  .gradient-orb-2 {
    width: 350px;
    height: 350px;
    background: radial-gradient(
      circle,
      rgba(255, 228, 181, 0.8) 0%,
      rgba(255, 184, 173, 0.6) 100%
    );
    top: 60%;
    right: 15%;
    animation-delay: -5s;
  }

  .gradient-orb-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(
      circle,
      rgba(249, 111, 93, 0.8) 0%,
      rgba(255, 228, 181, 0.6) 100%
    );
    bottom: 20%;
    left: 20%;
    animation-delay: -10s;
  }

  .gradient-orb-4 {
    width: 280px;
    height: 280px;
    background: radial-gradient(
      circle,
      rgba(255, 184, 173, 0.8) 0%,
      rgba(255, 228, 181, 0.6) 100%
    );
    top: 30%;
    right: 30%;
    animation-delay: -15s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(30px, -30px) scale(1.1);
    }
    50% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    75% {
      transform: translate(20px, 30px) scale(1.05);
    }
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    max-width: 1200px;
    width: 100%;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  .column-two {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .card {
    background-color: #43281c;
    color: #fbf2c0;
    border-radius: 5px;
    padding: 30px;
    box-shadow: 10px 10px 0 0 #f96f5d;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translate(-2px, -2px);
    box-shadow: 12px 12px 0 0 #f96f5d;
  }

  .who-am-i {
    text-align: center;
  }

  .stuff-i-did {
    width: 100%;
  }

  .face {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #f96f5d;
    margin: 0 auto 25px;
    display: block;
    transition: transform 0.3s ease;
  }

  .face:hover {
    transform: scale(1.05);
  }

  h1 {
    color: #ffb8ad;
    margin-bottom: 20px;
    font-size: 1.8rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 10px;
  }

  .the-stuff {
    list-style: none;
    padding-left: 0;
    color: #fbf2c0;
  }

  .the-stuff li {
    margin-bottom: 20px;
    line-height: 1.6;
    padding-left: 25px;
    position: relative;
    transition: padding-left 0.2s ease;
  }

  .the-stuff li::before {
    content: "•";
    color: #f96f5d;
    font-weight: bold;
    position: absolute;
    left: 8px;
    transition: color 0.2s ease;
  }

  .the-stuff li:hover {
    padding-left: 28px;
  }

  .the-stuff li:hover::before {
    color: #ffb8ad;
  }

  .the-stuff a {
    color: #ffb8ad;
    text-decoration: none;
    transition: color 0.2s ease;
    font-weight: 500;
  }

  .the-stuff a:hover {
    color: #f96f5d;
    text-decoration: underline;
  }

  :global(a:focus),
  :global(button:focus) {
    outline-offset: 3px;
  }

  .project-desc {
    color: #fbf2c0;
    font-size: 0.9rem;
    margin-top: 5px;
    opacity: 0.9;
  }

  .tech-stack {
    color: #f96f5d;
    font-size: 0.85rem;
    font-style: italic;
  }

  .contact-links {
    margin-top: 25px;
    padding-top: 20px;
  }

  .contact-links a {
    color: #ffb8ad;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.2s ease;
    font-size: 0.95rem;
  }

  .contact-links a:hover {
    color: #f96f5d;
    text-decoration: underline;
  }

  .recent-studio {
    width: 100%;
  }

  .recent-studio h2 {
    color: #ffb8ad;
    margin-bottom: 20px;
    font-size: 1.3rem;
  }

  .studio-link {
    display: block;
    text-align: center;
    color: #ffb8ad;
    text-decoration: none;
    margin-top: 15px;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .studio-link:hover {
    color: #f96f5d;
    text-decoration: underline;
  }

  .recent-images {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-bottom: 15px;
  }

  .recent-image-item {
    position: relative;
    aspect-ratio: 1;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    border: 2px solid #f96f5d;
    transition:
      transform 0.2s ease,
      border-color 0.2s ease;
  }

  .recent-image-item:hover {
    transform: scale(1.05);
    border-color: #ffb8ad;
  }

  .recent-image-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .recent-studio-empty {
    text-align: center;
    color: #fbf2c0;
    opacity: 0.7;
    font-style: italic;
    padding: 20px 0;
  }

  .cursor {
    display: inline-block;
    animation: blink 1s infinite;
    color: #f96f5d;
    font-weight: bold;
  }

  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    :global(body) {
      padding: 15px;
    }

    .container {
      grid-template-columns: 1fr;
      gap: 25px;
    }

    .column-two {
      gap: 25px;
    }

    .card {
      padding: 25px;
      box-shadow: 8px 8px 0 0 #f96f5d;
    }

    .card:hover {
      box-shadow: 10px 10px 0 0 #f96f5d;
    }

    h1 {
      font-size: 1.5rem;
    }

    .face {
      width: 150px;
      height: 150px;
    }

    .contact-links a {
      display: block;
      margin: 10px 0;
    }
  }

  @media (max-width: 480px) {
    .card {
      padding: 20px;
      box-shadow: 6px 6px 0 0 #f96f5d;
    }

    .card:hover {
      box-shadow: 8px 8px 0 0 #f96f5d;
    }

    h1 {
      font-size: 1.3rem;
    }

    .face {
      width: 120px;
      height: 120px;
    }

    .the-stuff li {
      padding-left: 20px;
    }

    .the-stuff li:hover {
      padding-left: 23px;
    }
  }
</style>
