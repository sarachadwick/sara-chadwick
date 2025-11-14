<div class="card stuff-i-did">
  <h1>the stuff</h1>
  <ul class="the-stuff">
    <li>
      <a href="/chicagosugarhigh">Chicago Sugar high</a> - a blog about trying
      baked goods
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
      - a clicker game about bunnies and muffins
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
      - a game-ified svelte/typescript tutorial
      <div class="project-desc">
        <span class="tech-stack">(Svelte, TypeScript)</span>
      </div>
    </li>
  </ul>
</div>

<style>
  .stuff-i-did {
    width: 100%;
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

  @media (max-width: 480px) {
    .the-stuff li {
      padding-left: 20px;
    }

    .the-stuff li:hover {
      padding-left: 23px;
    }
  }
</style>
