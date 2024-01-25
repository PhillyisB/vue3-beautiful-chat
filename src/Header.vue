<template>
  <div class="sc-header">
    <img class="sc-header--img" width="90" height="90" :src="GenieLogo" alt="" />
    <div class="sc-header--title">
      <p class="m-0 header-title">
        Genie
      </p>
      <p class="m-0 header-subtitle">
        Virtual Assistant
      </p>
    </div>
    <div data-bs-toggle="tooltip" title="clear chat" class="sc-header-clear" @click="clearChat()">
      <span>
        <FontAwesome icon="trash-can" type="solid" size="md" />
      </span>
    </div>
    <div v-show="!isMobile && !expandedWindow" type="icon" data-bs-toggle="tooltip" title="expand chat"
      class="sc-header-expand" @click="expandChat()">
      <span>
        <FontAwesome icon="up-right-and-down-left-from-center" type="solid" />
      </span>
    </div>
    <div v-show="!isMobile && expandedWindow" data-bs-toggle="tooltip" type="icon" title="minimize chat"
      class="sc-header-expand" @click="expandChat()">
      <span>
        <FontAwesome icon="window-minimize" type="solid" />
      </span>
    </div>
    <div v-show="isMobile" class="sc-header-expand pt-1" @click="$emit('close')">
      <span>
        <FontAwesome icon="xmark" type="solid" size="lg" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import FontAwesome from "./components/assets/fontAwesomeComponent.vue";
import GenieLogo from "./assets/genie_logo_main.png"

const expandedWindow = ref(false);
const isMobile = ref(window.innerWidth <= 760 ? true : false);



function expandChat() {
  document.getElementsByClassName("sc-chat-window")[0].classList.toggle("full-chat-window");
  document.getElementsByClassName("sc-header--img")[0].classList.toggle("hide");
  document.getElementsByClassName("sc-header")[0].classList.toggle("sc-header-full");

  document.getElementsByClassName("sc-message-list")[0].classList.toggle("sc-message-list-full");
  expandedWindow.value = expandedWindow.value ? false : true;
  window.scrollTo(0, 0);
  document.body.style.overflowY = expandedWindow.value ? "hidden" : "auto";
}

function clearChat() {
  // localStorage.removeItem(props.profileDetails?.subjectId as string);
  // messageList.value = [];
  // setMessagesStart();
  // answers.value = [];
  alert("Clear History Action")
}


</script>

<style lang="scss" scoped>
.sc-header {
  min-height: 75px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  padding: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  font-size: 18px;
  transition: color .2s ease 0s, background-color .2s ease 0s;
  background: #1e293b;
  color: #ffffff
}

.header-subtitle {
  font-size: .875rem;
  font-weight: 400;
}

.sc-header--img {
  border-radius: 50%;
  align-self: center;
  padding: 10px;
  max-width: 100%;
}

.sc-header--title {
  align-self: center;
  padding: 10px;
  flex: 1;
  user-select: none;
  font-size: 16px;
  font-weight: 600;
}

.sc-header-expand {
  position: absolute;
  right: 12%;
  top: 25%;
}

.sc-header-expand:hover {
  color: darken($color: white, $amount: 10);
  cursor: pointer;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
}

.sc-header-clear {
  position: absolute;
  right: 5%;
  top: 25%;
}

.sc-header-clear:hover {
  color: darken($color: white, $amount: 10);
  cursor: pointer;
}

.sc-header--title.enabled {
  cursor: pointer;
  border-radius: 5px;
}

.sc-header--title.enabled:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button {
  width: 40px;
  align-self: center;
  height: 40px;
  margin-right: 10px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 5px;
  margin-left: auto;
}

.sc-header--close-button:hover {
  box-shadow: 0px 2px 5px rgba(0.2, 0.2, 0.5, 0.1);
}

.sc-header--close-button img {
  width: 100%;
  height: 100%;
  padding: 13px;
  box-sizing: border-box;
}

@media (max-width: 450px) {
  .sc-header {
    border-radius: 0px;
  }
}
</style>
