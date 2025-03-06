<template>
  <main class="min-h-screen flex flex-col justify-between relative">
    <NavBar />
    <Loading />
    <ModalCart>
      <CartInfo />
    </ModalCart>
    <div class="flex-grow bg-PRP">
      <slot />
    </div>
    <Footer />
  </main>
</template>