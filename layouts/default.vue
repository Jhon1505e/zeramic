
<template>
  <main class="min-h-screen relative">
    <NavBar />
    <ModalCart>
      <CartInfo />
    </ModalCart>
    <slot />
    <ButtonsMobile />
   
    <Footer />
  </main>
</template>