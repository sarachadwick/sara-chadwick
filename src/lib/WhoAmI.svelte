<script>
  export let typewriterText = "";
</script>

<div class="card who-am-i">
  <div class="gradient-overlay"></div>
  <img alt="sara chadwick" class="face" src="/avatar.jpeg" />
  <h1>sara chadwick</h1>
  <p>
    {typewriterText}<span class="cursor">|</span>!
  </p>
  <p>this is my website and here is some stuff</p>

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

<style>
  .who-am-i {
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        ellipse at top left,
        rgba(180, 120, 105, 0.7) 0%,
        rgba(180, 120, 105, 0.4) 10%,
        transparent 40%
      ),
      radial-gradient(
        ellipse at top right,
        rgba(200, 165, 120, 0.7) 0%,
        rgba(200, 165, 120, 0.4) 20%,
        transparent 70%
      );
    pointer-events: none;
    z-index: 0;
  }

  .who-am-i > *:not(.gradient-overlay) {
    position: relative;
    z-index: 1;
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

  .contact-links {
    margin-top: 25px;
    padding: 15px 10px;
    background-color: #ffb8ad;
    border-radius: 12px;
    margin-left: -30px;
    margin-right: -30px;
    margin-bottom: -30px;
  }

  .contact-links a {
    color: #43281c;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.2s ease;
    font-size: 1.8rem;
    font-family: "Baloo 2", sans-serif;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: -2.5px;
  }

  .contact-links a:hover {
    color: #f96f5d;
    text-decoration: underline;
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
    .face {
      width: 150px;
      height: 150px;
    }

    .contact-links {
      margin-left: -15px;
      margin-right: -15px;
      padding: 12px 10px;
    }

    .contact-links a {
      display: block;
      margin: 8px 0;
    }
  }

  @media (max-width: 480px) {
    .face {
      width: 120px;
      height: 120px;
    }

    .contact-links {
      margin-left: -10px;
      margin-right: -10px;
      padding: 12px 10px;
    }
  }
</style>
