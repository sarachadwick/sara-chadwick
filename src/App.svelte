<script>
  import { onMount } from "svelte";
  import Header from "./lib/Header.svelte";
  import GradientOrbs from "./lib/GradientOrbs.svelte";
  import WhoAmI from "./lib/WhoAmI.svelte";
  import TheStuff from "./lib/TheStuff.svelte";
  import RecentStudio from "./lib/RecentStudio.svelte";

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
    const text = "hi i'm sara";
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

<Header />

<GradientOrbs />

<div class="container">
  <WhoAmI {typewriterText} />

  <div class="column-two">
    <TheStuff />
    <RecentStudio {recentImages} {navigateToStudio} />
  </div>
</div>

<style>
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

  @media (max-width: 768px) {
    .container {
      grid-template-columns: 1fr;
      gap: 25px;
    }

    .column-two {
      gap: 25px;
    }
  }
</style>
