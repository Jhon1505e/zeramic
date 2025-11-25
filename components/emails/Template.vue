<template>
<!-- / HEADER -->
  <div style="width: 520px; margin: auto; border-radius: 20px; border: 1px solid #ccc;
      font-size: 1rem; font-family: Arial, Helvetica, sans-serif;">
      <div style="background: radial-gradient(circle, #5200f8 60%, #4b00e2 100%);
          padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
        <a href="https://www.zeramic.co" target="_blank">
          <img src="https://www.zeramic.co/img/logo-zeramic.png" alt="Zeramic"
            style="width: 220px; margin: auto; display: block" />
        </a>
      </div>
      <div style="background-color: #ffff;">
<!-- / HEADER -->
        <slot></slot>      
<!-- / FOOTER -->
      </div>
      <div style="background: radial-gradient( circle, #5200f8 60%, #4b00e2 100%);
          border-bottom-right-radius: 10px; border-bottom-left-radius: 10px;
          padding: 10px;">
        <p style="text-align: end; font-size: 0.9rem; padding: 4px">
          <a href="https://zeramic.co" target="_blank"
            style="font-weight: 600; color: #ffff; text-decoration: underline">
            zeramic.co
          </a>
        </p>
      </div>
  </div>
<!-- / FOOTER -->
</template>