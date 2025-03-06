<template>
    <div
        style="width: 520px; margin: auto; border-radius: 5px; border: 1px solid #ccc; font-family: Arial, Helvetica, sans-serif;">
        <div style="background-color: #5200f8; padding: 20px; border-radius: 5px 5px 0 0;">
            <a href="https://www.zeramic.co" target="_blank">
                <img src="https://www.zeramic.co/img/logo-zeramic.png" alt="Zeramic"
                    style="width: 220px; margin: auto; display: block;">
            </a>
            <hr>
            <slot></slot>
            <hr>
            <p style="text-align: center; font-size: 0.9rem; padding: 4px;">
                Visita nuestra tienda en:
                <a href="https://zeramic.co" target="_blank" style="font-weight: 500; text-decoration: underline;">
                    zeramic.co
                </a>
            </p>
        </div>
    </div>
</template>