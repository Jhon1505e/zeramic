<script setup lang="ts">
import { RealtimeClient } from '@supabase/realtime-js'



const presenceState = ref();
const newPresences = ref();
const leftPresences = ref();
const status = ref()

onMounted(() => {

  const client = new RealtimeClient('https://lzlomcfdumwvwjtbnzcm.supabase.co', {
  params: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6bG9tY2ZkdW13dndqdGJuemNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NDcyNTIsImV4cCI6MjAwMzQyMzI1Mn0.GZJYjOQ_b5-74mUPyVqaqovHMbucPiAiQ9ouV13A4go"
  },
})

const channel = client.channel(
  'presence-test',
  {
    config: {
      presence: {
        key: ''
      }
    }
  }
)
    
channel.on('presence', { event: 'sync' }, () => {
  console.log('Online users: ', channel.presenceState())
  presenceState.value = channel.presenceState()
})

channel.on('presence', { event: 'join' }, ({ newPresences }) => {
  console.log('New users have joined: ', newPresences)
  newPresences.value = newPresences
})

channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
  console.log('Users have left: ', leftPresences)
  leftPresences.value = leftPresences
})

channel.subscribe(async (status) => {
  if (status === 'SUBSCRIBED') {
    const status = await channel.track({ 'user_id': 1 })
    console.log(status)
    status.value = status
  }
})

})
  
</script>

<template>
    <div>
        <pre>
          {{ presenceState }}
        </pre>
      <pre>
          {{ newPresences }}
        </pre>
      <pre>
          {{ leftPresences }}
        </pre>
      <pre>
          {{ status }}
        </pre>
    </div>
</template>
