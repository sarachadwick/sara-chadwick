<script>
  export let recentImages = [];
  export let navigateToStudio = () => {};
</script>

<div class="card recent-studio">
  <h2>studio</h2>
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
  <a href="/studio.html" class="studio-link">more →</a>
</div>

<style>
  .recent-studio {
    width: 100%;
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
</style>
