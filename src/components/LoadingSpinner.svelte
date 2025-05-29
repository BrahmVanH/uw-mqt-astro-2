<script lang="ts">
  import logo from "@/image/logo-no-text.svg";

  // setTimeout(() => {
  //   if (typeof window !== 'undefined' && window.location.pathname !== '/404') {
  //     window.location.href = '/404';
  // 	}
  // }, 20000);
</script>

<div class="loading-container">
  <div class="logo-wrapper">
    <img src={logo.src} class="logo" alt="United Way Logo" />
    <div class="spinner"></div>
  </div>
</div>

<style>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 9999;
  }

  .logo-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 156px;
    height: auto;
    z-index: 1;
    opacity: 0.7;
  }

  .spinner {
    position: absolute;
    width: 180px;
    height: 180px;
    border: 4px solid transparent;
    border-top-color: var(--primary-yellow-2);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
