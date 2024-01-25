<template>
  <div>
    <genie-chat
          :api-key="apiKey"
          :app-id="appId"
          :profile-details="profile"
        >
        </genie-chat>
  </div>
</template>


<script setup lang="ts">

import {ref } from "vue"
import { profile } from "./models/Profile";


const apiKey = ref("");
const appId = ref("");
const profile = ref<Profile>("");

profile.value = 


</script>

<style>

</style>
