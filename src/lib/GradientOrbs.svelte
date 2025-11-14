<!-- Floating gradient orbs -->
<div class="gradient-orb gradient-orb-1"></div>
<div class="gradient-orb gradient-orb-2"></div>
<div class="gradient-orb gradient-orb-3"></div>
<div class="gradient-orb gradient-orb-4"></div>

<style>
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
</style>
