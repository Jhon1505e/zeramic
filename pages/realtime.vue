<script setup lang="ts">
import { RealtimeClient } from '@supabase/realtime-js'

const client = new RealtimeClient(REALTIME_URL, {
  params: {
    apikey: API_KEY
  },
})
    
</script>

<template>
    <div>
        
        
    </div>
</template>
