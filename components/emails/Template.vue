<template>
  <div
    style="
      width: 520px;
      margin: auto;
      border-radius: 20px;
      border: 1px solid #ccc;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <div>
      <div
        style="
          background: radial-gradient(
            circle,
            rgba(89, 11, 249, 1) 64%,
            rgba(24, 4, 64, 1) 100%
          );
          padding-block: 20px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        "
      >
        <a href="https://www.zeramic.co" target="_blank">
          <img
            src="https://www.zeramic.co/img/logo-zeramic.png"
            alt="Zeramic"
            style="width: 220px; margin: auto; display: block"
          />
        </a>
      </div>
      <hr />
      <div style="background-color: #ffff">
        <slot></slot>
      </div>
      <hr />
      <div
        style="
          background: radial-gradient(
            circle,
            rgba(89, 11, 249, 1) 64%,
            rgba(24, 4, 64, 1) 100%
          );
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          padding-block: 10px;
          padding-inline: 20px;
        "
      >
        <p style="text-align: end; font-size: 0.9rem; padding: 4px">
          <a
            href="https://zeramic.co"
            target="_blank"
            style="font-weight: 600; color: #ffff; text-decoration: underline"
          >
            zeramic.co
          </a>
        </p>
      </div>
    </div>
  </div>
</template>